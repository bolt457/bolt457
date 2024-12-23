from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper import scrape_data
from api_integration import fetch_data_from_api
from celery_app import update_odds

# Route pour lancer la mise à jour des cotes
@app.route('/api/update_odds', methods=['POST'])
def update():
    update_odds.apply_async()  # Lancer la tâche de mise à jour des cotes
    return jsonify({"message": "Mise à jour des cotes lancée."}), 200

if __name__ == '__main__':
    app.run(debug=True)

app = Flask(__name__)
CORS(app)

# Variable pour stocker le total d'Africoins
total_africoins = 0

# Route pour obtenir le total d'Africoins
@app.route('/api/total_africoins', methods=['GET'])
def get_total_africoins():
    return jsonify({'total': total_africoins})

# Route pour émettre des Africoins
@app.route('/api/emit_africoins', methods=['POST'])
def emit_africoins():
    global total_africoins
    data = request.get_json()
    amount = data.get('amount', 0)

    if amount > 0:
        total_africoins += amount
        return jsonify({'message': f'{amount} Africoins émis avec succès.', 'total': total_africoins})
    else:
        return jsonify({'message': 'Montant invalide.', 'total': total_africoins}), 400

# Route pour scraper des données
@app.route('/api/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url')
    data = scrape_data(url)
    return jsonify(data), 200

# Route pour récupérer des données depuis une API
@app.route('/api/data', methods=['GET'])
def fetch_data():
    endpoint = request.args.get('endpoint')
    params = request.args.get('params')
    data = fetch_data_from_api(endpoint, params)
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)
