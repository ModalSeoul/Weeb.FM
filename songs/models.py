"""Songs model file, contains all data storage logic"""
from django.db import models
from artists.models import Artist
from albums.models import Album


class Song(models.Model):
    title = models.CharField(max_length=72)
    artist = models.ForeignKey(Artist)
    album = models.ForeignKey(Album, null=True, blank=True)
    scrobble_count = models.IntegerField(default=0)

    @property
    def artist_name(self):
        return self.artist.name

    def __str__(self):
        return self.title
