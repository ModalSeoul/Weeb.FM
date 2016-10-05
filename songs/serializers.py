from rest_framework import serializers

from artists.models import Artist
from songs.models import Song


class SongSerializer(serializers.ModelSerializer):

    class Meta:
        model = Song
