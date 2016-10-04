from django.db import models
from users.models import Member
from songs.models import Song


class Scrobble(models.Model):
    song = models.ForeignKey(Song)
    date_scrobbled = models.DateTimeField(auto_now_add=True)
    member = models.ForeignKey(Member)

    def __str__(self):
        # e.x "Hells Bells, AC/DC - Admin"
        return '{}, {} - {}'.format(self.song.title,
                                    self.song.artist.name,
                                    self.member.nick_name)
