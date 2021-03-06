from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('api/v1/cloud/', include('cloud.urls'))
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
