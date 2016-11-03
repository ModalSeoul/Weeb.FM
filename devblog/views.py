from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from devblog.models import Entry
from devblog.serializers import EntrySerializer
from WeebFM.permissions import IsOwnerOrReadOnly, IsStaffOrReadOnly


class EntryView(viewsets.ModelViewSet):
    queryset = Entry.objects.order_by('-date')
    serializer_class = EntrySerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsStaffOrReadOnly
    )

    def create(self, request):
        data = self.request.data
        user = self.request.user
        if user.is_staff:
            entry = Entry.objects.create(
                title=data.get('title'),
                body=data.get('body'),
                author=user)
            serializer = EntrySerializer(entry)
            return Response(serializer.data)
        else:
            return Response('You\'re not fucking staff.')
