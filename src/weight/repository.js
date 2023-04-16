import { db } from '../config/firebase.js';

const weightsCollection = db.collection('weights');

async function findAllWeights() {
    let weights = [];
    const weightsData = await weightsCollection.get();
    weightsData.forEach(u => {weights.push(u.data());});
    return weights;
}

async function findWeightById(id) {
    const weightData = await weightsCollection.doc(id).get();
    return weightData.data();
}

/**
 * Create a new weight. In case the weight (id) already exists, it will be entirely replaced.
 * @param {*} weight 
 * @returns 
 */
async function saveWeight(weight) {
    const result = await weightsCollection.doc(weight.id).set(weight);
    return result;
}

async function updateWeight(weight) {
    const result = await weightsCollection.doc(weight.id).update(weight);
    return result;
}

async function deleteWeightById(id) {
    const result = await weightsCollection.doc(id).delete();
    return result;
}

export {
    findAllWeights,
    findWeightById,
    saveWeight,
    updateWeight,
    deleteWeightById
};
