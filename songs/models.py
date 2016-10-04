from django.db import models
from artists.models import Artist


class Song(models.Model):
    title = models.CharField(max_length=72, unique=True)
    artist = models.ForeignKey(Artist)
    duration = models.IntegerField(null=True)

    def __str__(self):
        return self.title
