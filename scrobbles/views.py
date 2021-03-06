import json
import datetime
from datetime import timedelta

from django.db.models import Count, F
from django.shortcuts import render
from django.utils import timezone

from rest_framework import viewsets, generics, permissions
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response

from songs.models import Song
from songs.serializers import SongSerializer
from users.serializers import MemberSerializer
from users.models import Member
from artists.models import Artist
from albums.models import Album

from .models import Scrobble
from .serializers import ScrobbleSerializer, CreateScrobbleSerializer
from WeebFM.permissions import IsOwnerOrReadOnly


def song_exists(title, artist):
    check = Song.objects.filter(
        title__iexact=title, artist__name__iexact=artist)
    if len(check) != 0:
        return True
    else:
        return False


def album_exists(title):
    check = Album.objects.filter(title__iexact=title)
    if len(check) != 0:
        return True
    else:
        return False


def artist_exists(name):
    check = Artist.objects.filter(name__iexact=name)
    if len(check) != 0:
        return True
    else:
        return False


class ScrobbleView(viewsets.ModelViewSet):
    queryset = Scrobble.objects.all()
    serializer_class = ScrobbleSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly)

    def get_queryset(self):
        data = self.request.query_params
        query = Scrobble.objects.all()
        user = self.request.user

        if 'active' in data:
            query = Scrobble.objects.filter(
                member__nick_name__iexact=data.get('active'))
            query = query.order_by('-date_scrobbled')[:1]
        if 'last_played' in data:
            query = Scrobble.objects.latest('date_scrobbled')
        elif 'past' in data:
            query = Scrobble.objects.order_by('-id')[:int(data.get('past'))]
        elif 'artist' in data:
            query = Scrobble.objects.filter(
                song__artist__name=data.get('artist'))
        elif 'song' in data:
            query = Scrobble.objects.filter(song__title=data.get('song'))
        # Example: ?by_user=Idiot&start=9&end=15
        elif 'by_user' in data:
            start, end = int(data.get('start')), int(data.get('end'))
            query = Scrobble.objects.filter(
                member__nick_name__iexact=data.get('by_user'))
            query = query.order_by('-date_scrobbled')[start:end]
        return query

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateScrobbleSerializer
        return ScrobbleSerializer

    def create(self, request):
        data = self.request.data
        creator = self.request.user
        serializer = self.get_serializer_class()

        if artist_exists(data['artist']):
            artist = Artist.objects.get(name__iexact=data['artist'])
            artist.scrobble_count += 1
            artist.save()
        else:
            if isinstance(data['artist'], bytes):
                data['artist'] = data['artist'].decode('UTF-8')
            artist = Artist.objects.create(name=data['artist'])

        if 'album' in data:
            if album_exists(data['album']):
                album = Album.objects.get(title__iexact=data['album'])
                album.scrobble_count += 1
                album.save()
            else:
                if isinstance(data['album'], bytes):
                    data['album'] = data['album'].decode('UTF-8')
                album = Album.objects.create(
                    title=data['album'], artist=artist, scrobble_count=1)

        if len(data['song']) > 0 and not data['song'].isspace():

            if song_exists(data['song'], data['artist']):

                song = Song.objects.get(
                    title__iexact=data['song'], artist__id=artist.id)
                song.scrobble_count += 1
                song.save()

            else:
                if 'album' in data:
                    # Encoding if needed
                    if isinstance(data['song'], bytes):
                        data['song'] = data['song'].decode('UTF-8')

                    # Creating song with album, artist & title
                    song = Song.objects.create(
                        title=data['song'], artist=artist, album=album)
                else:
                    # Encoding if needed
                    if isinstance(data['song'], bytes):
                        data['song'] = data['song'].decode('UTF-8')

                    # Creating song with title & artist only.
                    song = Song.objects.create(
                        title=data['song'], artist=artist)

            creator.listened_to.add(song)
            creator.save()

            # if user wants, they can specify their own time for a scrobble.
            if 'timestamp' in data:
                date_s = data.get('timestamp')
            else:
                date_s = timezone.now()

            obj = Scrobble.objects.create(song=song,
                                          member=creator, date_scrobbled=date_s)
            created = serializer(instance=obj)

            return Response(created.data)
        return Response('Song was either only whitespace or < 1 char')

    # In a perfect world, these functions would be
    # in a BaseFilterBackend. Screws fall out all the time,
    # the world's an imperfect place.
    @action(detail=True, methods=['GET'])
    def by_artist(self, request, pk=None):
        """List all scrobbles from one artist(pk)"""
        if pk is not None:
            queryset = Scrobble.objects.filter(artist__name__iexact=pk)
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def by_album(self, request, pk=None):
        """Lists all scrobbles from one album(pk)"""
        if pk is not None:
            queryset = Scrobble.objects.filter(song__album__title__iexact=pk)
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def wiltweek(self, request):
        q = request.query_params.get
        queryset = Scrobble.objects.all()

        # holla holla get dolla (last.week is mine now)
        if q('user'):
            pk_scrobbles = queryset.filter(member__nick_name__iexact=q('user'))
            week_scrobbles = pk_scrobbles.filter(
                date_scrobbled__range=[
                    timezone.now() - timedelta(days=6),
                    timezone.now()])

            b = week_scrobbles.values('song__artist__name').annotate(
                count=Count('song__artist__name'),
                artist=F('song__artist__name')).order_by('-count').values('artist', 'count')
            return Response(b)

    @action(detail=False, methods=['GET'])
    def count(self, request):
        return Response(Scrobble.objects.all().count())

    @action(detail=True, methods=['GET'])
    def by_song(self, request, pk=None):
        """Lists all scrobbles from one song(pk)"""
        if pk is not None:
            queryset = Scrobble.objects.filter(song__title__iexact=pk)
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def by_user(self, request, pk=None):
        """Lists scrobbles from one user"""
        if pk is not None:
            queryset = Scrobble.objects.filter(member__nick_name__iexact=pk)
            queryset = queryset.order_by('-date_scrobbled')[9:15]
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def by_user_id(self, request, pk=None):
        queryset = Scrobble.objects.filter(member=pk)
        serializer = ScrobbleSerializer(instance=queryset, many=True)
        return Response(serializer.data)
