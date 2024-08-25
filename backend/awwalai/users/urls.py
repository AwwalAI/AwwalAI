from django.urls import path
from .views import SignupAPIView, LoginAPIView, CheckUsernameAPIView, LogoutAPIView

urlpatterns = [
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('check-username/<str:username>/', CheckUsernameAPIView.as_view(), name='check-username'),
]
