"""Scrobbles model file, contains all data storage logic"""
from django.db import models
from users.models import Member
from songs.models import Song


class Scrobble(models.Model):
    """Scrobbles model to specifically handle all
    Artist data/storage within the Scrobbles app"""
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    date_scrobbled = models.DateTimeField()

    def __str__(self):
        # e.x "Hells Bells, AC/DC - Admin"
        return '{}, {} - {}'.format(self.song.title,
                                    self.song.artist.name,
                                    self.member.nick_name)
