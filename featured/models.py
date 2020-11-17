"""Featured models storage/logic. Stores currently featured
artists, songs, albums, and genres."""
from __future__ import unicode_literals

from django.db import models
from artists.models import Artist
from songs.models import Song


class Current(models.Model):
    song = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    note = models.TextField(max_length=1200)
    link = models.URLField(max_length=200)
    active = models.BooleanField(default=True)


class Historical(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    note = models.TextField(max_length=1200)
    # genre = models.ForeignKey(Genre) TODO: Add Genre application
    date_created = models.DateTimeField(auto_now_add=True)
    date_started = models.DateTimeField()
    date_ended = models.DateTimeField()
