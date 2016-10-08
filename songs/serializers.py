from rest_framework import serializers

from artists.models import Artist
from songs.models import Song


class SongSerializer(serializers.ModelSerializer):
    album_name = serializers.CharField(source='album.title', read_only=True)

    class Meta:
        model = Song
        fields = ('__all__',)
