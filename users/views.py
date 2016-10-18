"""User views file. Contains all viewsets/routes for the Users app"""
from django.contrib.auth.hashers import make_password
from django.db.models import Count
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from users.serializers import MemberSerializer, CreateMemberSerializer, \
    FriendshipSerializer
from users.models import Member, Friendship


class MemberView(viewsets.ModelViewSet):
    '''Member viewset - handles all Member
    related routes/post-creation tasks'''
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateMemberSerializer
        return MemberSerializer

    @list_route(methods=['GET'])
    def current(self, request):
        user = Member.objects.get(id=self.request.user.id)
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    @list_route(methods=['GET'])
    def count(self, request):
        return Response(len(Member.objects.all()))

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


class FriendshipView(viewsets.ModelViewSet):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
