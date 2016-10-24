from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Artist
from .serializers import ArtistSerializer
from .filters import *


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
    def name(self, request, pk=None):
        if pk:
            queryset = Artist.objects.get(name__iexact=pk)
            serializer = ArtistSerializer(instance=queryset)
            return Response(serializer.data)
