from rest_framework import serializers

from users.models import Member
from songs.models import Song
from artists.models import Artist

from .models import Scrobble


class CreateScrobbleSerializer(serializers.Serializer):
    song = serializers.CharField()
    date_scrobbled = serializers.DateTimeField()


class ScrobbleSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='song.artist', read_only=True)
    song_name = serializers.CharField(source='song')

    class Meta:
        model = Scrobble
        fields = ('id', 'song_name', 'artist_name', 'date_scrobbled')
