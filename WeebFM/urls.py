from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import url, include
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from users.views import MemberView
from scrobbles.views import ScrobbleView
from songs.views import SongView
from artists.views import ArtistView
from albums.views import AlbumView
from featured.views import CurrentView, HistoricalView


router = DefaultRouter()
router.register(r'members', MemberView, base_name='members')
router.register(r'scrobbles', ScrobbleView, base_name='scrobbles')
router.register(r'songs', SongView, base_name='songs')
router.register(r'artists', ArtistView, base_name='artists')
router.register(r'albums', AlbumView, base_name='albums')
router.register(r'featured/current', CurrentView, base_name='currents')
router.register(r'featured/historical', HistoricalView, base_name='historicals')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/api-token-auth/', views.obtain_auth_token)
] + static('/', document_root=settings.MEDIA_ROOT)
