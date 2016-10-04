from django.db import models
from artists.models import Artist
from albums.models import Album


class Song(models.Model):
    title = models.CharField(max_length=72, unique=True)
    artist = models.ForeignKey(Artist)
    album = models.ForeignKey(Album, null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    scrobble_count = models.IntegerField(default=0)

    def __str__(self):
        return '{} - {}'.format(self.title, self.artist.name)
