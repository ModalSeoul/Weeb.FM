from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Album
from .serializers import AlbumSerializer


class AlbumView(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
