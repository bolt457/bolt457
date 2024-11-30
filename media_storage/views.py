from django.shortcuts import render
from django.http import HttpResponse  # Assurez-vous d'importer HttpResponse
from .models import Image, Music, Video  # Assurez-vous d'importer tous les modèles nécessaires
from utils.api_request import make_request  # Importez la fonction make_request si nécessaire

def index(request):
    return render(request, 'media_storage/index.html')

def images(request):
    images = Image.objects.all()
    return render(request, 'media_storage/images.html', {'images': images})

def music(request):
    music_list = Music.objects.all()
    return render(request, 'media_storage/music.html', {'music': music_list})

def videos(request):
    videos = Video.objects.all()
    return render(request, 'media_storage/videos.html', {'videos': videos})

def upload_image(request):
    if request.method == 'POST':
        return HttpResponse("Image téléchargée avec succès !")
    return render(request, 'media_storage/upload_image.html')

def upload_music(request):
    if request.method == 'POST':
        return HttpResponse("Musique téléchargée avec succès !")
    return render(request, 'media_storage/upload_music.html')

def upload_video(request):
    if request.method == 'POST':
        return HttpResponse("Vidéo téléchargée avec succès !")
    return render(request, 'media_storage/upload_video.html')

def tubidy_search(request):
    query = request.GET.get('q', '')
    try:
        search_results = make_request()
        return render(request, 'media_storage/tubidy_search.html', {'results': search_results})
    except Exception as e:
        return HttpResponse(f"Une erreur s'est produite : {e}")

def import_videos(request):
    query = request.GET.get('q', 'default_video')
    video_results = get_youtube_videos(query)
    return render(request, 'media_storage/imported_videos.html', {'results': video_results})

def import_images(request):
    query = request.GET.get('q', 'default_image')
    image_results = get_unsplash_images(query)
    return render(request, 'media_storage/imported_images.html', {'results': image_results})

def import_music(request):
    query = request.GET.get('q', 'default_music')
    music_results = get_soundcloud_tracks(query)
    return render(request, 'media_storage/imported_music.html', {'results': music_results})

def products(request):
    return HttpResponse("Page des produits")
