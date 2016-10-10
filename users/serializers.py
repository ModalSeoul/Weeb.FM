"""Serializer module for the Users app."""
from rest_framework import serializers
from users.models import Member, Friendship
from songs.models import Song


class MemberSerializer(serializers.ModelSerializer):
    '''Member serializer - handles all data serialization
    for the Member model'''
    loved_tracks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Song.objects.all(), required=False)

    class Meta:
        model = Member
        fields = ('__all__')


class FriendshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friendship
