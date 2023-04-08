import { Router } from 'express';
import { db } from '../config/firebase.js';
// import { authenticateUser } from '../auth/auth.js';

export const router = Router();

const usersCollection = db.collection('users');

// Get all users
router.get('/', async (req, res) => {
    let users = [];
    const usersData = await usersCollection.get();
    usersData.forEach(u => {users.push({id: u.id, ...u.data()});});
    res.status(200).json(users);
    
    // res.send(users);
});

// Get user by email
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const userData = await usersCollection.doc(id).get();
        const user = { id: userData.id, ...userData.data() };
        if (!user.hasOwnProperty('email')) {
            throw new Error(`User with email ${id} does not exist.`)
        }
        res.status(200).json(user);
    } catch (e) {
        console.log(e.message);
        res.status(404).json({message: e.message});
    }
});

// Post new user
router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const email = user && user.hasOwnProperty('email') && user.email ? user.email : '';
        if (!email) {
            throw new Error('Request body does not contain required field: email');
        }
        const result = await usersCollection.doc(email).set(user);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Update entire user
router.put('/:id', async (req, res) => {
    try {
        const user = req.body;
        const id = req.params.id;
        const email = user && user.hasOwnProperty('email') && user.email ? user.email : '';
        if (!email) {
            throw new Error('Request body does not contain required field: email');
        }
        if (id !== email) {
            throw new Error(`Payload and params emails must match, ${email} and ${id}`);
        }
        const result = await usersCollection.doc(id).set(user);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Update user fields
router.patch('/:id', async (req, res) => {
    try {
        const user = req.body;
        const id = req.params.id;
        const email = user && user.hasOwnProperty('email') && user.email ? user.email : '';
        if (!email) {
            throw new Error('Request body does not contain required field: email');
        }
        if (id !== email) {
            throw new Error(`Payload and params emails must match, ${email} and ${id}`);
        }
        const result = await usersCollection.doc(id).update(user);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Delete user if she or he exists
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await usersCollection.doc(id).delete();
        console.log(result);
        res.send('successfully deleted');
    } catch (err) {
        console.log(err.response);
        res.send(err);
    }
});
