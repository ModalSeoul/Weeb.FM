from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Scrobble
from .serializers import ScrobbleSerializer


class ScrobbleView(viewsets.ModelViewSet):
    queryset = Scrobble.objects.all()
    serializer_class = ScrobbleSerializer
