import { Router } from 'express';
import { addWeight, deleteWeight, getAllWeights, getWeightById, updateEntireWeight, updateWeightFields } from './service.js';

export const router = Router();

// Get all weights
router.get('/', async (req, res) => {
    try {
        const weights = await getAllWeights();
        res.status(200).json(weights);
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'server error'});
    }
});

// Get weight by email
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const weight = await getWeightById(id);
        res.status(200).json(weight);
    } catch(e) {
        console.log(e);
        res.status(404).json({message: 'not found'});
    }
});

// Post new weight
router.post('/', async (req, res) => {
    try {
        const weight = req.body;
        const result = await addWeight(weight);
        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update entire weight
router.put('/:id', async (req, res) => {
    try {
        const weight = req.body;
        const id = req.params.id;
        const result = await updateEntireWeight(id, weight);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update weight fields
router.patch('/:id', async (req, res) => {
    try {
        const weight = req.body;
        const id = req.params.id;
        const result = await updateWeightFields(id, weight);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Delete weight if she or he exists
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteWeight(id);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
});
