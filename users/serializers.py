"""Serializer module for the Users app."""
from rest_framework import serializers
from users.models import Member, Friendship
from songs.models import Song
from scrobbles.models import Scrobble


class CreateMemberSerializer(serializers.Serializer):
    nick_name = serializers.CharField()
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        passwd = validated_data.pop('password', None)
        user_name = validated_data.pop('username', None)
        mail = validated_data.pop('email', None)
        nick = validated_data.pop('nick_name', None)
        instance = Member(
                email=mail,
                username=user_name,
                nick_name=nick)
        if passwd is not None:
            instance.set_password(passwd)
        instance.save()
        return instance

class MemberSerializer(serializers.ModelSerializer):
    '''Member serializer - handles all data serialization
    for the Member model'''
    listen_count = serializers.SerializerMethodField('calc_listen_count')
    loved_tracks = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True, required=False)

    def calc_listen_count(self, obj):
        return Scrobble.objects.filter(member=obj.id).count()

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
            instance.save()
            return instance

    class Meta:
        model = Member
        exclude = ('email', 'password')


class FriendshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friendship
