# calculs.py

import math
import requests

def calculer_popularite(followers, engagement):
    return math.log(followers) * engagement

def recuperer_donnees_reseau_social(api_url):
    response = requests.get(api_url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def calculer_cote_star(followers, engagement, ventes, recompenses):
    popularite = calculer_popularite(followers, engagement)
    return (popularite * ventes) / (recompenses + 1)

# Exemple d'utilisation
followers = 50000
engagement = 0.05
ventes = 10000
recompenses = 3

cote = calculer_cote_star(followers, engagement, ventes, recompenses)
print(f"La cote de la star est : {cote}")
