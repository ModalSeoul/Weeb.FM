"""User views file. Contains all viewsets/routes for the Users app"""
from rest_framework import viewsets
from users.serializers import MemberSerializer
from users.models import Member


class MemberView(viewsets.ModelViewSet):
    '''Member viewset - handles all Member
    related routes/post-creation tasks'''
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
