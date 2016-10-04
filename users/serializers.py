from rest_framework import serializers
from .models import Member


class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
