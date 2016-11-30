"""Featured views file. Contains all viewsets/routes for the Featured app"""
from rest_framework import viewsets
from featured.serializers import CurrentSerializer, HistoricalSerializer
from featured.models import Current, Historical


class CurrentView(viewsets.ModelViewSet):
    """Currently featured viewset handles all
    currently featured routes/post-creation tasks"""
    queryset = Current.objects.all()
    serializer_class = CurrentSerializer

    def get_queryset(self):
        data = self.request.query_params
        query = Current.objects.all()

        if 'active' in data:
            query = Current.objects.filter(active=data.get('active'))

        return query


class HistoricalView(viewsets.ModelViewSet):
    """Historical list/lookup of featurings"""
    queryset = Historical.objects.all()
    serializer_class = HistoricalSerializer
