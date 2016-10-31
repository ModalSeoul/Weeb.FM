from django.contrib import admin

from .models import Scrobble


@admin.register(Scrobble)
class ScrobbleAdmin(admin.ModelAdmin):
    list_display = ('song', 'get_artist', 'member')
    list_filter = ('member', 'song__artist')
    search_fields = ('member__nick_name', 'song__artist__name')

    def get_artist(self, obj):
        return obj.song.artist.name

    get_artist.short_description = 'Artist'
