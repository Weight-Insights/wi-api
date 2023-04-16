import { Router } from 'express';
import { addGame, deleteGame, getAllGames, getGameById, updateEntireGame, updateGameFields } from './service.js';

export const router = Router();

// Get all games
router.get('/', async (req, res) => {
    try {
        const games = await getAllGames();
        res.status(200).json(games);
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'server error'});
    }
});

// Get game by email
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const game = await getGameById(id);
        res.status(200).json(game);
    } catch(e) {
        console.log(e);
        res.status(404).json({message: 'not found'});
    }
});

// Post new game
router.post('/', async (req, res) => {
    try {
        const game = req.body;
        const result = await addGame(game);
        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update entire game
router.put('/:id', async (req, res) => {
    try {
        const game = req.body;
        const id = req.params.id;
        const result = await updateEntireGame(id, game);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update game fields
router.patch('/:id', async (req, res) => {
    try {
        const game = req.body;
        const id = req.params.id;
        const result = await updateGameFields(id, game);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Delete game if she or he exists
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteGame(id);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
});
