from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from songs.models import Song
from songs.serializers import SongSerializer
from users.models import Member
from artists.models import Artist
from albums.models import Album

from .models import Scrobble
from .serializers import ScrobbleSerializer, CreateScrobbleSerializer


def song_exists(title):
    check = Song.objects.filter(title=title)
    if len(check) != 0:
        return True
    else:
        return False


def album_exists(title):
    check = Album.objects.filter(title=title)
    if len(check) != 0:
        return True
    else:
        return False


def artist_exists(name):
    check = Artist.objects.filter(name=name)
    if len(check) != 0:
        return True
    else:
        return False


class ScrobbleView(viewsets.ModelViewSet):
    queryset = Scrobble.objects.all()
    serializer_class = ScrobbleSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateScrobbleSerializer
        return ScrobbleSerializer

    def create(self, request):
        data = self.request.data
        creator = self.request.user
        serializer = self.get_serializer_class()

        if artist_exists(data['artist']):
            artist = Artist.objects.get(name=data['artist'])
            artist.scrobble_count += 1
            artist.save()
        else:
            artist = Artist.objects.create(name=data['artist'])

        if 'album' in data:
            if album_exists(data['album']):
                album = Album.objects.get(title=data['album'])
                album.scrobble_count += 1
                album.save()
            else:
                album = Album.objects.create(
                    title=data['album'], artist=artist, scrobble_count=1)

        if song_exists(data['song']):
            song = Song.objects.get(title=data['song'])
            song.scrobble_count += 1
            song.save()
        else:
            song = Song.objects.create(
                title=data['song'], artist=artist)

        creator.listened_to.add(song)
        creator.save()
        obj = Scrobble.objects.create(song=song, member=creator)
        created = serializer(instance=obj)
        return Response(created.data)

    # In a perfect world, these 3 functions would be
    # in a BaseFilterBackend. Screws fall out all the time,
    # the world's an imperfect place.
    @detail_route(methods=['GET'])
    def by_artist(self, request, pk=None):
        """List all scrobbles from one artist(pk)"""
        if pk is not None:
            queryset = Scrobble.objects.filter(artist__name__iexact=pk)
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def by_album(self, request, pk=None):
        """Lists all scrobbles from one album(pk)"""
        if pk is not None:
            queryset = Scrobble.objects.filter(song__album__title__iexact=pk)
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def by_song(self, request, pk=None):
        """Lists all scrobbles from one song(pk)"""
        if pk is not None:
            queryset = Scrobble.objects.filter(song__title__iexact=pk)
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def by_user(self, request, pk=None):
        """Lists all scrobbles from one user(pk)"""
        if pk is not None:
            queryset = Scrobble.objects.filter(member__nick_name__iexact=pk)
            queryset = queryset.order_by('-date_scrobbled')
            serializer = ScrobbleSerializer(instance=queryset, many=True)
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def by_user_id(self, request, pk=None):
        queryset = Scrobble.objects.filter(member=pk)
        serializer = ScrobbleSerializer(instance=queryset, many=True)
        return Response(serializer.data)
