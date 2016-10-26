from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Artist
from .serializers import ArtistSerializer
from .filters import *

from users.models import Member
from scrobbles.models import Scrobble

from operator import itemgetter


class ArtistView(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    filter_backends = [
        ArtistFilter
    ]

    @list_route(methods=['GET'])
    def popular(self, request):
        queryset = Artist.objects.order_by('-scrobble_count')[:20]
        serializer = ArtistSerializer(instance=queryset, many=True)
        return Response(serializer.data)

    @detail_route(methods=['GET'])
    def top(self, request, pk=None):
        # This is fucking ridiculous LOL
        if pk:
            artists = []
            user = Member.objects.get(nick_name__iexact=pk)
            scrobbles = Scrobble.objects.filter(member__id=user.id)
            artist_names = scrobbles.values_list(
                'song__artist__name').distinct()
            for artist in artist_names:
                artist_name = artist[0]
                artist_scrobbles = scrobbles.filter(
                    song__artist__name=artist_name).count()

                artists.append({
                    'name': artist_name,
                    'count': artist_scrobbles
                })
            artists = sorted(
                artists, key=itemgetter('count'), reverse=True)[:10]
            return Response(artists)

    @detail_route(methods=['GET', 'PATCH'])
    def name(self, request, pk=None):
        if pk:
            if not request.method == 'PATCH':
                queryset = Artist.objects.get(name__iexact=pk)
                serializer = ArtistSerializer(instance=queryset)
                return Response(serializer.data)
            else:
                queryset = Artist.objects.get(name__iexact=pk)
                queryset.bio = request.data['bio']
                queryset.save()
                serializer = ArtistSerializer(instance=queryset)
                return Response(serializer.data)
