"""Featured models storage/logic. Stores currently featured
artists, songs, albums, and genres."""
from __future__ import unicode_literals

from django.db import models
from artists.models import Artist
from songs.models import Song


class Current(models.Model):
    song = models.ForeignKey(Song, unique=True)  # Ensures no duplicates
    note = models.TextField(max_length=1200)  # Short text about the song
    # genre = models.ForeignKey(Genre) TODO: Add Genre application
    start_date = models.DateTimeField()  # Scheduled featuring
    end_date = models.DateTimeField()  # Scheduled ending of featuring


class Historical(models.Model):
    song = models.ForeignKey(Song, unique=True)
    note = models.TextField(max_length=1200)
    # genre = models.ForeignKey(Genre) TODO: Add Genre application
    date_created = models.DateTimeField(auto_now_add=True)
    date_started = models.DateTimeFIeld()
    date_ended = models.DateTimeField()
