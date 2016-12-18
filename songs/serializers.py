from rest_framework import serializers

from artists.models import Artist
from songs.models import Song


class SongSerializer(serializers.ModelSerializer):
    album_name = serializers.CharField(source='album.title', read_only=True)
    artist_name = serializers.CharField(source='artist.name', read_only=True)

    @staticmethod
    def setup_eager_loading(cls, queryset):
        # This is a optimization gamble. Will it work?!?!?!?
        queryset = queryset.prefetch_related('album', 'artist')
        return queryset

    class Meta:
        model = Song
        fields = '__all__'
