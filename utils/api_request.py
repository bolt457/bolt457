import requests
from requests.adapters import HTTPAdapter, Retry

def make_request():
    url = 'https://api.tubidy.com/search?q=https%3A%2F%2Fwww.googleapis.com%2Fyoutube%2Fv3%2Fsearch%3Fpart%3Dsnippet%26q%3Dgoogle%26type%3Dvideo%26key=votre_cl%C3%A9_api&key=votre_cl%C3%A9_api'
    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('https://', adapter)
    response = session.get(url)
    return response.json()

try:
    response = make_request()
    print(response)
except requests.exceptions.ConnectionError:
    print("Une erreur de connexion s'est produite.")
