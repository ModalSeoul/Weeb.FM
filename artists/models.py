"""Artists model file, contains all data storage logic"""
from django.db import models


class Artist(models.Model):
    '''Artists model to specifically handle all
    Artist data/storage within the Artist app.'''
    name = models.CharField(max_length=260, unique=True)
    picture = models.ImageField(
        upload_to='cdn/images/artists/', null=True, blank=True)
    scrobble_count = models.IntegerField(default=0)
    # No two artists can share the same bio
    bio = models.TextField(max_length=1200, unique=True, null=True, blank=True)

    def __str__(self):
        return self.name
