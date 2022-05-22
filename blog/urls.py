from django.urls import path
from . import views     #. is current directory

urlpatterns = [
    path('', views.about, name='blog-about'), 
    path('about/', views.about, name='blog-about'),
    path('login/', views.login, name='blog-login'),
    path('register/', views.register, name='blog-register'),
    path('output/', views.output, name='output'),
    path('home/', views.home, name='blog-home'),
    path('newstudent/', views.newstudent, name='blog-newstudent'),
    path('newstudent/uploadstaticfile', views.newstudent, name='upload')
]



