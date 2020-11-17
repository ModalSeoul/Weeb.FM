from django.conf import settings
from django.contrib import admin
from django.conf.urls import url, include
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from users.views import MemberView, FollowingView, MemberInfoView, ShoutViewSet
from scrobbles.views import ScrobbleView
from songs.views import SongView
from artists.views import ArtistView
from albums.views import AlbumView
from featured.views import CurrentView, HistoricalView
from devblog.views import EntryView


router = DefaultRouter()
router.register(r'members', MemberView)
router.register(r'member_info', MemberInfoView)
router.register(r'shouts', ShoutViewSet)
router.register(r'followings', FollowingView)
router.register(r'scrobbles', ScrobbleView)
router.register(r'songs', SongView)
router.register(r'artists', ArtistView)
router.register(r'albums', AlbumView)
router.register(r'featured/current', CurrentView)
router.register(r'featured/historical', HistoricalView)
router.register(r'blog_entries', EntryView)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/api-token-auth/', views.obtain_auth_token),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
] + static('/', document_root=settings.MEDIA_ROOT)
