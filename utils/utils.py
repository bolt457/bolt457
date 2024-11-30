import requests

def get_tubidy_data(query):
    url = "https://api.tubidy.com/search"
    params = {
        "q": query,  # Le terme de recherche que vous souhaitez utiliser
        "key": "votre_clé_api"  # Remplacez "votre_clé_api" par votre clé API de Tubidy
    }
    response = requests.get(url, params=params)
    return response.json()

def get_youtube_videos(query):
    api_key = "votre_clé_api"
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "key": api_key
    }
    response = requests.get(url, params=params)
    return response.json()

def get_unsplash_images(query):
    api_key = "votre_clé_api"
    url = f"https://api.unsplash.com/search/photos"
    params = {
        "query": query,
        "client_id": api_key
    }
    response = requests.get(url, params=params)
    return response.json()

def get_soundcloud_tracks(query):
    api_key = "votre_clé_api"
    url = "https://api.soundcloud.com/tracks"
    params = {
        "q": query,
        "client_id": api_key
    }
    response = requests.get(url, params=params)
    return response.json()
