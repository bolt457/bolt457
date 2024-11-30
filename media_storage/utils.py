import requests

def get_tubidy_data(query):
    url = "https://api.tubidy.com/search"
    params = {
        "q": query,  # Le terme de recherche que vous souhaitez utiliser
        "key": "votre_clé_api"  # Remplacez "votre_clé_api" par votre clé API de Tubidy
    }
    response = requests.get(url, params=params)
    return response.json()
