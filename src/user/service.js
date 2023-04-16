import { v4 as uuidv4 } from 'uuid';
import { deleteUserById, findAllUsers, findFirstUserByEmail, findUserById, saveUser, updateUser } from './repository.js';

async function getAllUsers() {
    const users = await findAllUsers();
    return users;
}

async function getUserById(id) {
    const user = await findUserById(id);
    if (!user.hasOwnProperty('email')) {
        throw new Error(`User with id ${id} does not exist.`)
    }
    return user;
}

async function getUserByEmail(email) {
    const user = await findFirstUserByEmail(email);
    return user;
}

async function addUser(user) {
    const email = user && user.hasOwnProperty('email') && user.email ? user.email : '';
    if (!email) {
        throw new Error('Request body does not contain required field: email');
    }
    const id = uuidv4();
    const result = await saveUser({id, ...user});
    return result;
}

async function updateEntireUser(id, user) {
    const email = user && user.hasOwnProperty('email') && user.email ? user.email : '';
    if (!email) {
        throw new Error('Request body does not contain required field: email');
    }
    if (id !== user.id) {
        throw new Error(`Payload and params ids must match, ${user.id} and ${id}`);
    }
    const result = await saveUser(user);
    return result;
}

async function updateUserFields(id, user) {
    const email = user && user.hasOwnProperty('email') && user.email ? user.email : '';
    if (!email) {
        throw new Error('Request body does not contain required field: email');
    }
    if (id !== user.id) {
        throw new Error(`Payload and params ids must match, ${useer.id} and ${id}`);
    }
    const result = await updateUser(user);
    return result;
}

async function deleteUser(id) {
    const result = await deleteUserById(id);
    return result;
}

export {
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateEntireUser,
    updateUserFields,
    deleteUser
};
