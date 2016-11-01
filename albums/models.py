from django.db import models

from artists.models import Artist

ALBUM_CDN_PATH = 'cdn/images/albums/'


class Album(models.Model):
    title = models.CharField(max_length=260, unique=True)
    artist = models.ForeignKey(Artist)
    release_year = models.IntegerField(null=True, blank=True)
    cover = models.ImageField(upload_to=ALBUM_CDN_PATH)
    scrobble_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
