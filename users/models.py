"""Users model file, contains all data storage logic"""
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser


class Member(AbstractUser):
    '''Memebr(user) model. Abstracted from Django user accounts.'''
    nick_name = models.CharField(max_length=24, unique=True)
    profile_picture = models.ImageField(
        upload_to='cdn/images/avatars/', null=True, blank=True)

    # String to show in Django Admin
    def __str__(self):
        return self.nick_name
