from rest_framework.filters import BaseFilterBackend


class ArtistFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        q = request.query_params.get
        user = request.user

        if q('exact_count'):
            query = queryset.filter(scrobble_count=q('exact_count'))
        if q('range_start') and q('range_end'):
            query = queryset.filter(
                scrobble_count__range=[q('range_start'), q('range_end')])
        return query
