from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from songs.models import Song

from .models import Scrobble
from .serializers import ScrobbleSerializer

def song_exists(title):
    does_exist = Song.objects.filter(title=title)
    if len(does_exist) != 0:
        return True
    else:
        return False


class ScrobbleView(viewsets.ModelViewSet):
    queryset = Scrobble.objects.all()
    serializer_class = ScrobbleSerializer

    def perform_create(self, serializer):
        serializer.save(member=self.request.user)

    @detail_route(methods=['POST'])
    def write(self, request, pk=None):
         song_title = request.data.get('song_title')
         song_album = request.data.get('song_album')
         song_artist = request.data.get('song_artist')

         if song_exists(song_title):
             song_object = Song.objects.get(title=song_title)
             create = Scrobble.objects.create(song=song_object,
                                            member=self.request.user)
         return Response(create) # TODO: This just won't return a good response
