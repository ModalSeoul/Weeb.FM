import math
from operator import itemgetter
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Artist
from .serializers import ArtistSerializer
from .filters import *
from users.models import Member
from scrobbles.models import Scrobble
from WeebFM.permissions import IsStaffOrReadOnly


class ArtistView(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = (IsStaffOrReadOnly,)

    filter_backends = [
        ArtistFilter
    ]

    @action(detail=False, methods=['GET'])
    def popular(self, request):
        queryset = Artist.objects.order_by('-scrobble_count')[:20]
        serializer = ArtistSerializer(instance=queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def count(self, request):
        params = request.query_params.get
        if params('artist'):
            count = Scrobble.objects.filter(
                song__artist__name__iexact=params('artist')).count()
            return Response({'count': count})

    @action(detail=True, methods=['GET', 'PATCH'])
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
