import { db } from '../config/firebase.js';

const gamesCollection = db.collection('games');

async function findAllGames() {
    let games = [];
    const gamesData = await gamesCollection.get();
    gamesData.forEach(u => {games.push(u.data());});
    return games;
}

async function findGameById(id) {
    const gameData = await gamesCollection.doc(id).get();
    return gameData.data();
}

/**
 * Create a new game. In case the game (id) already exists, it will be entirely replaced.
 * @param {*} game 
 * @returns 
 */
async function saveGame(game) {
    const result = await gamesCollection.doc(game.id).set(game);
    return result;
}

async function updateGame(game) {
    const result = await gamesCollection.doc(game.id).update(game);
    return result;
}

async function deleteGameById(id) {
    const result = await gamesCollection.doc(id).delete();
    return result;
}

export {
    findAllGames,
    findGameById,
    saveGame,
    updateGame,
    deleteGameById
};
