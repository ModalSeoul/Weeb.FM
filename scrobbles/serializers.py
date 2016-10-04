from rest_framework import serializers

from users.models import Member
from songs.models import Song
from artists.models import Artist

from .models import Scrobble


class CreateScrobbleSerializer(serializers.Serializer):
    song = serializers.CharField()
    date_scrobbled = serializers.DateTimeField()


class ScrobbleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scrobble
