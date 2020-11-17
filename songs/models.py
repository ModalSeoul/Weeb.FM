"""Songs model file, contains all data storage logic"""
from django.db import models
from artists.models import Artist
from albums.models import Album


class Song(models.Model):
    title = models.CharField(max_length=260)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, null=True, blank=True, on_delete=models.CASCADE)
    scrobble_count = models.IntegerField(default=0)

    @property
    def artist_name(self):
        return self.artist.name

    def __str__(self):
        return self.title
