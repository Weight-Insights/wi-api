import { Router } from 'express';
import { addPayment, deletePayment, getAllPayments, getPaymentById, updateEntirePayment, updatePaymentFields } from './service.js';

export const router = Router();

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await getAllPayments();
        res.status(200).json(payments);
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'server error'});
    }
});

// Get payment by email
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const payment = await getPaymentById(id);
        res.status(200).json(payment);
    } catch(e) {
        console.log(e);
        res.status(404).json({message: 'not found'});
    }
});

// Post new payment
router.post('/', async (req, res) => {
    try {
        const payment = req.body;
        const result = await addPayment(payment);
        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update entire payment
router.put('/:id', async (req, res) => {
    try {
        const payment = req.body;
        const id = req.params.id;
        const result = await updateEntirePayment(id, payment);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update payment fields
router.patch('/:id', async (req, res) => {
    try {
        const payment = req.body;
        const id = req.params.id;
        const result = await updatePaymentFields(id, payment);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Delete payment if she or he exists
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deletePayment(id);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
});
