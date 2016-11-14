from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from .models import Album
from .serializers import AlbumSerializer
from WeebFM.permissions import IsStaffOrReadOnly


class AlbumView(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    # TODO: Try posting from no staff
    permission_classes = (IsStaffOrReadOnly,)

    @detail_route(methods=['GET'])
    def by_artist(self, request, pk=None):
        # If artist id is passed
        if pk is not None:
            # filter by passed artist id
            queryset = Album.objects.filter(artist=pk)
            # serialize the filtered album objects(lets us display properly)
            serializer = AlbumSerializer(instance=queryset, many=True)
            # return the serialized & filtered data to the viewset
            return Response(serializer.data)
