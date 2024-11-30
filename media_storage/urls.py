from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('images/', views.images, name='images'),
    path('music/', views.music, name='music'),
    path('videos/', views.videos, name='videos'),
    path('search/', views.tubidy_search, name='tubidy_search'),
    path('import_videos/', views.import_videos, name='import_videos'),
    path('import_images/', views.import_images, name='import_images'),
    path('import_music/', views.import_music, name='import_music'),
    path('upload/image/', views.upload_image, name='upload_image'),
    path('upload/music/', views.upload_music, name='upload_music'),
    path('upload/video/', views.upload_video, name='upload_video'),
    path('products/', views.products, name='products'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
