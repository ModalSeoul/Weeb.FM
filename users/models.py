"""Users model file, contains all data storage logic"""
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from songs.models import Song


class Member(AbstractUser):
    '''Memebr(user) model. Abstracted from Django user accounts.'''
    nick_name = models.CharField(max_length=24, unique=True)
    loved_tracks = models.ManyToManyField(Song, blank=True)
    listened_to = models.ManyToManyField(
        Song, blank=True, related_name='listened_to')
    profile_picture = models.ImageField(
        upload_to='cdn/images/avatars/', null=True, blank=True)

    # String to show in Django Admin
    def __str__(self):
        return self.nick_name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
