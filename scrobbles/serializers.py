from rest_framework import serializers

from users.models import Member
from songs.models import Song
from artists.models import Artist

from .models import Scrobble


class CreateScrobbleSerializer(serializers.Serializer):
    song = serializers.CharField()
    # artist = serializers.CharField()
    date_scrobbled = serializers.DateTimeField()
    artist = serializers.SerializerMethodField('test')

    def test(self, obj):
        # TODO: SHIT IS BROKEN
        return None

    class Meta:
        model = Scrobble
        fields = ('song', 'artist', 'date_scrobbled')


class ScrobbleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scrobble
