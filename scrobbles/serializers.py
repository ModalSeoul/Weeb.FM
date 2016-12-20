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
    album_name = serializers.CharField(source='song.album', read_only=True)
    nick = serializers.CharField(source='member.nick_name', read_only=True)
    is_loved = serializers.SerializerMethodField(source='get_is_loved')

    def get_is_loved(self, obj):
        if obj.song in obj.member.loved_tracks.all():
            return True
        else:
            return False

    class Meta:
        model = Scrobble
        fields = ('id', 'song_name', 'album_name', 'is_loved', 'song',
                  'artist_name', 'date_scrobbled', 'member', 'nick')
