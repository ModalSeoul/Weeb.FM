"""Users model file, contains all data storage logic"""
from __future__ import unicode_literals
#from stdimage.models import StdImageField

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from songs.models import Song


class Member(AbstractUser):
    """Member(user) model. Abstracted from Django user accounts"""
    nick_name = models.CharField(max_length=60, unique=True)
    loved_tracks = models.ManyToManyField(Song, blank=True)

    listened_to = models.ManyToManyField(
        Song, blank=True, related_name='listened_to')

    profile_picture = models.ImageField(
        upload_to='cdn/images/avatars/', null=True, blank=True)

    # DECEMBAWEEEEEEEEEEEEEEEN
    banner_picture = models.ImageField(
        upload_to='cdn/images/banners/', null=True, blank=True)

    def __str__(self):
        return self.nick_name


class Shout(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(Member, on_delete=models.CASCADE)
    shouted_to = models.ForeignKey(Member, related_name='shouted_to', on_delete=models.CASCADE)
    text = models.CharField(max_length=200)

    def __str__(self):
        return '{} -> {}'.format(created_by, shouted_to)


class MemberInfo(models.Model):
    """Holds member social links, bio, etc"""
    bio = models.CharField(
        max_length=200, default='I haven\'t wrote a bio!', null=True)
    github = models.CharField(max_length=100, null=True, blank=True)
    twitter = models.CharField(max_length=100, null=True, blank=True)
    reddit = models.CharField(max_length=100, null=True, blank=True)
    youtube = models.CharField(max_length=140, null=True, blank=True)
    belongs_to = models.OneToOneField(Member, on_delete=models.CASCADE)

    def __str__(self):
        return self.belongs_to.nick_name


class Following(models.Model):
    following = models.ManyToManyField(Member, related_name='sender')
    belongs_to = models.ForeignKey(Member, on_delete=models.CASCADE)

    def __str__(self):
        return 'People {} follows'.format(self.belongs_to.nick_name)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
