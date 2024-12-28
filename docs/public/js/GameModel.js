import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    path: { type: String, required: true }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
