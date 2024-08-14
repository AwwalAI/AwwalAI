# users/urls.py

from django.urls import path
from .views import SignupAPIView, LoginAPIView, CheckUsernameAPIView

urlpatterns = [
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('check-username/<str:username>/', CheckUsernameAPIView.as_view(), name='check-username'),
]
