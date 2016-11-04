from rest_framework.filters import BaseFilterBackend
from users.models import MemberInfo


class UserFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        q = request.query_params.get
        user = request.user
        query = queryset

        if q('listened'):
            query = query.filter(
                    listened_to__artist__name__iexact=q('listened')).distinct()
        if q('token'):
            query = Member.objects.get(id=q('token'))
        return query
