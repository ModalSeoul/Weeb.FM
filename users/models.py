from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser


# Inherits from Django's default user.
# Any fields specified below are in addition
# to Django's abstracted user-model.
class Member(AbstractUser):
    nick_name = models.CharField(max_length=24, unique=True)

    # String to show in Django Admin
    def __str__(self):
        return self.nick_name
