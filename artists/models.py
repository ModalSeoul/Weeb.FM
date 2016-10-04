from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=72, unique=True)
    picture = models.ImageField(upload_to='cdn/images/artists/')
    # No two artists can share the same bio
    bio = models.TextField(max_length=1200, unique=True)

    def __str__(self):
        return self.name
