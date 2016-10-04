"""Featured views file. Contains all viewsets/routes for the Featured app"""
from rest_framework import viewsets
from featured.serializers import CurrentSerializer, HistoricalSerializer
from featured.models import Current, Historical


class CurrentView(viewsets.ModelViewSet):
    '''Currently featured viewset - handles all currently
    featured routes/post-creation tasks'''
    queryset = Current.objects.all()
    serializer_class = CurrentSerializer


class HistoricalView(viewsets.ModelViewSet):
    '''Historical list/lookup of featurings'''
    queryset = Historical.objects.all()
    serializer_class = HistoricalSerializer
