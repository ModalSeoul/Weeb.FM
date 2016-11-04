"""User views file. Contains all viewsets/routes for the Users app"""
from operator import itemgetter
from collections import defaultdict
from django.contrib.auth.hashers import make_password
from django.http import HttpResponseRedirect
from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import permissions

from users.serializers import MemberSerializer, CreateMemberSerializer, \
    FollowingSerializer, FollowerSerializer, MemberInfoSerializer
from users.models import Member, Following, MemberInfo
from scrobbles.models import Scrobble
from .filters import UserFilter
from WeebFM.permissions import IsOwnerOrReadOnly


class MemberInfoView(viewsets.ModelViewSet):
    '''Social links for a user. User foreign keys to this'''
    queryset = MemberInfo.objects.all()
    serializer_class = MemberInfoSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    )

    @detail_route(methods=['GET', 'PATCH'])
    def nick(self, request, pk=None):
        resp = MemberInfo.objects.get(belongs_to__nick_name__iexact=pk)
        serializer = MemberInfoSerializer(instance=resp)
        return Response(serializer.data)


class MemberView(viewsets.ModelViewSet):
    '''Member viewset - handles all Member
    related routes/post-creation tasks'''
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    )

    filter_backends = [
        UserFilter
    ]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateMemberSerializer
        return MemberSerializer

    @list_route(methods=['GET'])
    def current(self, request):
        try:
            user = Member.objects.get(id=self.request.user.id)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @list_route(methods=['GET'])
    def most_scrobbles(self, request):
        users = []
        for user in Member.objects.all():
            scrobbles = Scrobble.objects.filter(member__id=user.id)
            count_dict = {
                'nick_name': user.nick_name,
                'count': scrobbles.count(),
                'percent': 100 * (
                    scrobbles.count() / Scrobble.objects.all().count())
            }
            users.append(count_dict)
        # Leaderboard queryset ?leaderboard=True
        leaderboard = self.request.query_params.get('leaderboard', None)
        if leaderboard is not None:
            top_users = sorted(
                users, key=itemgetter('count'), reverse=True)[:25]
            return Response(top_users)
        return Response(users)

    @list_route(methods=['GET'])
    def count(self, request):
        return Response(len(Member.objects.all()))

    @detail_route(methods=['GET'])
    def top(self, request, pk=None):
        user = Member.objects.get(nick_name__iexact=pk)
        scrobbles = Scrobble.objects.filter(member_id=user.pk)
        count = scrobbles.count()
        data = scrobbles.filter(member=user).values(
            'member', 'song__artist', 'song__artist__name').annotate(
            total=Count('id')).order_by('-total')
        data = data[:10]
        for i in data:
            i['percent'] = 100 * (i['total'] / count)
        return Response(status=200, data=data)

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
        return HttpResponseRedirect('https://wilt.fm/settings')

    @list_route(methods=['POST'])
    def upload_banner(self, request):
        token = self.request.data['my_token']
        member = Token.objects.get(key=token).user
        member.banner_picture = self.request.data['banner_picture']
        member.save()
        return HttpResponseRedirect('https://wilt.fm/settings')


class FollowingView(viewsets.ModelViewSet):
    queryset = Following.objects.all()
    serializer_class = FollowingSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    )

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
