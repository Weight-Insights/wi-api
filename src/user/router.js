import { Router } from 'express';
import { db } from '../config/firebase.js';
// import { authenticateUser } from '../auth/auth.js';

export const router = Router();

const usersCollection = db.collection('gameuser');

// Get all users
router.get('/', async (req, res) => {
    let users = [];
    const entries = await usersCollection.get();
    entries.forEach(entry => {
        users.push(entry.data());
    });
    // res.status(200).json(users);
    
    res.send(users);
});

// Get user by email
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await usersCollection.doc(email).get();
        // res.status(200).json(user.data());
        res.send(user.data());
    } catch (e) {
        console.log(e.message, `User with email ${email} does not exist.`);
        res.sendStatus(404);
    }
});

// Post new user
router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const email = user.email;
        const isValid = user && user.hasOwnProperty('email') && user.email.length > 0;
        if (!isValid) {
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
router.put('/:email', async (req, res) => {
    try {
        const user = req.body;
        const email = req.params.email;
        const isValid = user && user.hasOwnProperty('email') && user.email.lenght > 0;
        if (!isValid) {
            throw new Error('Request body does not contain required field: email');
        }
        if (email !== user.mail) {
            throw new Error(`Payload and params emails must match, ${email} and ${user.email}`);
        }
        const result = await usersCollection.doc(email).set(user);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Delete user if she or he exists
router.delete('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const result = await usersCollection.doc(email).delete();
        console.log(result);
        res.send('successfully deleted');
    } catch (err) {
        console.log(err.response);
        res.send(err);
    }
});
