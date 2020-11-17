from __future__ import unicode_literals
from django.db import models
from users.models import Member


class Entry(models.Model):
    author = models.ForeignKey(Member, on_delete=models.CASCADE)
    title = models.CharField(max_length=140)
    body = models.TextField(max_length=6400)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} by {} on {}'.format(
            self.title, self.author.nick_name, self.date)

    class Meta:
        verbose_name = "Dev Blog Entrie"  # Django admin appends an 's'.
