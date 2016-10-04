"""Serializer module for the Users app."""
from rest_framework import serializers
from users.models import Member


class MemberSerializer(serializers.ModelSerializer):
    '''Member serializer - handles all data serialization
    for the Member model'''
    
    class Meta:
        model = Member
