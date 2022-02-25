import os
from pathlib import Path
from sys import maxsize

from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):

    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username)

        user.set_password(password)
        user.save()


        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    disk_space = models.IntegerField(default=1024**3)
    used_space = models.IntegerField(default=0)
    profile_photo = models.ImageField(null=True, default='default.jpeg')
    main_folder = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'disk_space', 'used_space', 'profile_photo', 'main_folder','is_active']

    def __str__(self):
        return self.username


class File(models.Model):

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    access_lynk = models.CharField(max_length=255, default='')
    size = models.IntegerField(default=0)
    path = models.CharField(default='', max_length=255)
    user_id = models.IntegerField(default=0)
    parent_id = models.IntegerField(default=0)
    childs = models.CharField(max_length=255, default='')
    file = models.FileField(null=True, default='')

    def __str__(self):
        return self.name










