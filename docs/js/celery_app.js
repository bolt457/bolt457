const Queue = require('bull');
const updateOddsQueue = new Queue('update-odds', 'redis://127.0.0.1:6379');

updateOddsQueue.process(async (job) => {
    // Logique de mise à jour des cotes
    console.log('Mise à jour des cotes...');
    // Exemple de tâche
    // const odds = calculateOdds(popularity, performance, history);
    return { message: 'Cotes mises à jour' };
});

function update_odds() {
    updateOddsQueue.add({});
}

module.exports = { update_odds };
