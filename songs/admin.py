from django.contrib import admin

from .models import Song


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'album')
    list_filter = ('artist', 'album')
    search_fields = ['title', 'artist__name', 'album__title']
