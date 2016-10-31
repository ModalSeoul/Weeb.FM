"""Serializer module for the Featured app."""
from rest_framework import serializers
from featured.models import Current, Historical


class CurrentSerializer(serializers.ModelSerializer):
    '''Current serializer - handles all data serialization
    for the Current model'''

    class Meta:
        model = Current


class HistoricalSerializer(serializers.ModelSerializer):
    '''Historical serializer - handles all data serialization
    for the Historical model'''

    class Meta:
        model = Historical
        fields = '__all__'
