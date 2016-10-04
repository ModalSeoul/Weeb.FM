from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Song
from .serializers import SongSerializer


class SongView(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    @detail_route(methods=['GET'])
    def by_artist(self, request, pk=None):
        # If artist id is passed
        if pk is not None:
            # filter by passed artist id
            queryset = Song.objects.filter(artist=pk)
            # serialize the filtered song objects(lets us display properly)
            serializer = SongSerializer(instance=queryset, many=True)
            # return the serialized & filtered data to the viewset
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def by_album(self, request, pk=None):
        # If artist id is passed
        if pk is not None:
            # filter by passed artist id
            queryset = Song.objects.filter(album=pk)
            # serialize the filtered song objects(lets us display properly)
            serializer = SongSerializer(instance=queryset, many=True)
            # return the serialized & filtered data to the viewset
            return Response(serializer.data)
