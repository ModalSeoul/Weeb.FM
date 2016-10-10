from django.shortcuts import render
from rest_framework import viewsets
from devblog.models import Entry
from devblog.serializers import EntrySerializer


class EntryView(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
