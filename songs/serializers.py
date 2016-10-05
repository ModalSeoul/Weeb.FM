from rest_framework import serializers

from artists.models import Artist
from songs.models import Song


class SongSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist', read_only=True)

    class Meta:
        model = Song
        fields = ('id', 'title', 'artist', 'artist_name', 'album')
