from email.policy import default
from importlib.metadata import requires
from pyexpat import model
from unittest.util import _MAX_LENGTH
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import fields, serializers
from cloud.models import File

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User 
        fields = ('id', 'email', 'username', 'password')
        queryset = ['msg']


class FileCreateSerializer(serializers.Serializer):

    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    type = serializers.CharField(max_length=100)
    size = serializers.IntegerField(required=False, default=0)
    path = serializers.CharField(required=False, default='')
    user_id = serializers.IntegerField(default=0)
    parent_id = serializers.IntegerField(default=0)
    childs = serializers.CharField(required=False, default='')

    def create(self, validated_data):
        return File.objects.create(**validated_data)


class FileSerializer(serializers.ModelSerializer):
  class Meta():
    model = File
    fields = '__all__'


class GetFolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = '__all__'


class RenameFileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    type = serializers.CharField(max_length=100)
    size = serializers.IntegerField(required=False, default=0)
    path = serializers.CharField(required=False, default='')
    user_id = serializers.IntegerField(default=0)
    parent_id = serializers.IntegerField(default=0)
    childs = serializers.CharField(required=False, default='')