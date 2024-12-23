from flask import Flask, request, jsonify, send_from_directory
import openai
import os

# Assurez-vous que la clé API OpenAI est définie dans les variables d'environnement
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__, static_folder="public", template_folder="public")

@app.route('/')
def home():
    return send_from_directory(os.path.join(app.root_path, 'public'), 'chatbot.html')

@app.route('/chat', methods=["POST"])
def chat():
    user_message = request.json.get("message")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Utilisation de l'API ChatCompletion pour GPT-3.5
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.7
        )

        chatbot_message = response['choices'][0]['message']['content'].strip()
        return jsonify({"message": chatbot_message})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)