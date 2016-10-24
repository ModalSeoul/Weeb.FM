"""User views file. Contains all viewsets/routes for the Users app"""
from django.contrib.auth.hashers import make_password
from django.http import HttpResponseRedirect
from django.db.models import Count
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from users.serializers import MemberSerializer, CreateMemberSerializer, \
    FollowingSerializer, FollowerSerializer
from users.models import Member, Following


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

    @list_route(methods=['POST'])
    def upload_avatar(self, request):
        token = self.request.data['my_token']
        member = Token.objects.get(key=token).user
        member.profile_picture = self.request.data['profile_picture']
        member.save()
        return HttpResponseRedirect('https://modal.moe/settings')

    @list_route(methods=['POST'])
    def upload_banner(self, request):
        token = self.request.data['my_token']
        member = Token.objects.get(key=token).user
        member.banner_picture = self.request.data['banner_picture']
        member.save()
        return HttpResponseRedirect('https://modal.moe/settings')


class FollowingView(viewsets.ModelViewSet):
    queryset = Following.objects.all()
    serializer_class = FollowingSerializer

    @detail_route(methods=['POST'])
    def follow(self, request, pk=None):
        print(pk)
        if pk:
            query = Following.objects.get(belongs_to__nick_name__iexact=pk)
            query.following.add(self.request.user.id)
            serializer = FollowingSerializer(query)
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def following(self, request, pk=None):
        if pk:
            query = Following.objects.get(belongs_to__nick_name__iexact=pk)
            serializer = FollowingSerializer(query)
            return Response(serializer.data)

    @detail_route(methods=['GET'])
    def followers(self, request, pk=None):
        if pk:
            query = Following.objects.filter(following__in=pk)
            serializer = FollowerSerializer(instance=query, many=True)
            values = query.values_list('belongs_to__nick_name', flat=True)
            return Response(values)
