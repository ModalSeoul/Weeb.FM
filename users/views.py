"""User views file. Contains all viewsets/routes for the Users app"""
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from users.serializers import MemberSerializer
from users.models import Member


class MemberView(viewsets.ModelViewSet):
    '''Member viewset - handles all Member
    related routes/post-creation tasks'''
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    @detail_route(methods=['GET'])
    def by_token(self, request, pk=None):
        if pk is not None:
            instance = Token.objects.get(key=pk)
            member = Member.objects.get(id=instance.user_id)
            serializer = MemberSerializer(instance=member)
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def by_nick(self, request, pk=None):
        if pk is not None:
            queryset = Member.objects.get(nick_name__iexact=pk)
            serializer = MemberSerializer(instance=queryset)
            return Response(serializer.data)
