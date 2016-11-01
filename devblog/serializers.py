from rest_framework import serializers
from devblog.models import Entry


class EntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = '__all__'
