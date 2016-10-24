from rest_framework.filters import BaseFilterBackend


class UserFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        q = request.query_params.get
        user = request.user

        if q('listens_to'):
            print(q('listens_to'))
            queryset = queryset.filter(
                        listened_to__artist__name__iexact=q('listens_to'))
        return queryset
