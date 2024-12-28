// Fonction pour envoyer le message au serveur Flask et afficher la réponse du chatbot
function sendMessage() {
    var userMessage = document.getElementById("userInput").value;
    if (userMessage.trim() !== "") {
        appendMessage("Vous: " + userMessage, "user");
        document.getElementById("userInput").value = "";

        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage("Chatbot: " + data.message, "bot");
        })
        .catch(error => {
            console.error("Error:", error);
            appendMessage("Erreur de connexion. Réessayez plus tard.", "bot");
        });
    }
}

// Fonction pour ajouter le message à la boîte de chat
function appendMessage(message, sender) {
    var messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    document.getElementById("messages").appendChild(messageDiv);
    // Faire défiler vers le bas pour voir le dernier message
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}