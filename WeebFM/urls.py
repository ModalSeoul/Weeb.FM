from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import url, include
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from users.views import MemberView
from scrobbles.views import ScrobbleView
from songs.views import SongView
from artists.views import ArtistView
from albums.views import AlbumView

router = DefaultRouter()
router.register(r'members', MemberView, base_name='members')
router.register(r'scrobbles', ScrobbleView, base_name='scrobbles')
router.register(r'songs', SongView, base_name='songs')
router.register(r'artists', ArtistView, base_name='artists')
router.register(r'albums', AlbumView, base_name='albums')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
]
