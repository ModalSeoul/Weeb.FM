from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import BaseFilterBackend
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from .models import Song
from .serializers import SongSerializer
from users.models import Member
from WeebFM.permissions import IsStaffOrReadOnly


class SongView(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = (IsStaffOrReadOnly,)

    def get_queryset(self):
        q = self.request.query_params.get
        queryset = Song.objects.all()

        if q('loved'):
            user = Member.objects.get(nick_name__iexact=q('loved'))
            queryset = Song.objects.filter(id__in=user.loved_tracks.all())
        return queryset

    @detail_route(methods=['POST'])
    def love(self, request, pk=None):
        if pk and not self.request.user.is_anonymous:
            song = Song.objects.get(id=pk)
            if song in self.request.user.loved_tracks.all():
                print('Unloved')
                self.request.user.loved_tracks.remove(song)
            else:
                print('Loved')
                self.request.user.loved_tracks.add(song)
            return Response('Good good')
        else:
            return Response('WOA CHECK YA PRIVILEGE U PC BRA?')

    @list_route(methods=['GET'])
    def popular(self, request):
        queryset = Song.objects.order_by('-scrobble_count')[:20]
        serializer = SongSerializer(instance=queryset, many=True)
        return Response(serializer.data)

    @detail_route(methods=['GET'])
    def by_artist(self, request, pk=None):
        # If artist id is passed
        if pk is not None:
            # filter by passed artist id
            queryset = Song.objects.filter(artist__name__iexact=pk)
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
