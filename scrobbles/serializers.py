from rest_framework import serializers
from .models import Scrobble


class ScrobbleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scrobble
