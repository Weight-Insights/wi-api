import { Router } from 'express';
import { addUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateEntireUser, updateUserFields } from './service.js';

export const router = Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'server error'});
    }
});

// Get user by email
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch(e) {
        console.log(e);
        res.status(404).json({message: 'not found'});
    }
});

// Get user by email
router.get('/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await getUserByEmail(email);
        res.status(200).json(user);
    } catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Post new user
router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const result = await addUser(user);
        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update entire user
router.put('/:id', async (req, res) => {
    try {
        const user = req.body;
        const id = req.params.id;
        const result = await updateEntireUser(id, user);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update user fields
router.patch('/:id', async (req, res) => {
    try {
        const user = req.body;
        const id = req.params.id;
        const result = await updateUserFields(id, user);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Delete user if she or he exists
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUser(id);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
});
