import { v4 as uuidv4 } from 'uuid';
import { deleteWeightById, findAllWeights, findWeightById, saveWeight, updateWeight } from './repository.js';

async function getAllWeights() {
    const weights = await findAllWeights();
    return weights;
}

async function getWeightById(id) {
    const weight = await findWeightById(id);
    return weight;
}

async function addWeight(weight) {
    const id = uuidv4();
    const result = await saveWeight({id, ...weight});
    return result;
}

async function updateEntireWeight(id, weight) {
    if (id !== weight.id) {
        throw new Error(`Payload and params ids must match, ${weight.id} and ${id}`);
    }
    const result = await saveWeight(weight);
    return result;
}

async function updateWeightFields(id, weight) {
    if (id !== weight.id) {
        throw new Error(`Payload and params ids must match, ${weight.id} and ${id}`);
    }
    const result = await updateWeight(weight);
    return result;
}

async function deleteWeight(id) {
    const result = await deleteWeightById(id);
    return result;
}

export {
    getAllWeights,
    getWeightById,
    addWeight,
    updateEntireWeight,
    updateWeightFields,
    deleteWeight
};
