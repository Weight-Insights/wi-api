import { db } from '../config/firebase.js';

const usersCollection = db.collection('users');

async function findAllUsers() {
    let users = [];
    const usersData = await usersCollection.get();
    usersData.forEach(u => {users.push(u.data());});
    return users;
}

async function findUserById(id) {
    const userData = await usersCollection.doc(id).get();
    return userData.data();
}

async function findFirstUserByEmail(email) {
    const snapshot = await usersCollection.where('email', '==', email).get();
    if (snapshot.empty) {
        throw new Error(`User with email ${email} does not exist.`);
    }  
    return snapshot[0].data();
}

/**
 * Create a new user. In case the user (id) already exists, it will be entirely replaced.
 * @param {*} user 
 * @returns 
 */
async function saveUser(user) {
    const result = await usersCollection.doc(user.id).set(user);
    return result;
}

async function updateUser(user) {
    const result = await usersCollection.doc(user.id).update(user);
    return result;
}

async function deleteUserById(id) {
    const result = await usersCollection.doc(id).delete();
    return result;
}

export {
    findAllUsers,
    findUserById,
    findFirstUserByEmail,
    saveUser,
    updateUser,
    deleteUserById
};
