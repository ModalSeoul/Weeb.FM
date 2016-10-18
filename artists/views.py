from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Artist
from .serializers import ArtistSerializer


class ArtistView(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    @list_route(methods=['GET'])
    def popular(self, request):
        queryset = Artist.objects.order_by('-scrobble_count')[:10]
        serializer = ArtistSerializer(instance=queryset, many=True)
        return Response(serializer.data)
