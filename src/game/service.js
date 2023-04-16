import { v4 as uuidv4 } from 'uuid';
import { deleteGameById, findAllGames, findGameById, saveGame, updateGame } from './repository.js';

async function getAllGames() {
    const games = await findAllGames();
    return games;
}

async function getGameById(id) {
    const game = await findGameById(id);
    return game;
}

async function addGame(game) {
    const id = uuidv4();
    const result = await saveGame({id, ...game});
    return result;
}

async function updateEntireGame(id, game) {
    if (id !== game.id) {
        throw new Error(`Payload and params ids must match, ${game.id} and ${id}`);
    }
    const result = await saveGame(game);
    return result;
}

async function updateGameFields(id, game) {
    if (id !== game.id) {
        throw new Error(`Payload and params ids must match, ${game.id} and ${id}`);
    }
    const result = await updateGame(game);
    return result;
}

async function deleteGame(id) {
    const result = await deleteGameById(id);
    return result;
}

export {
    getAllGames,
    getGameById,
    addGame,
    updateEntireGame,
    updateGameFields,
    deleteGame
};
