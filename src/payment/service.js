import { v4 as uuidv4 } from 'uuid';
import { deletePaymentById, findAllPayments, findPaymentById, savePayment, updatePayment } from './repository.js';

async function getAllPayments() {
    const payments = await findAllPayments();
    return payments;
}

async function getPaymentById(id) {
    const payment = await findPaymentById(id);
    return payment;
}

async function addPayment(payment) {
    const id = uuidv4();
    const result = await savePayment({id, ...payment});
    return result;
}

async function updateEntirePayment(id, payment) {
    if (id !== payment.id) {
        throw new Error(`Payload and params ids must match, ${payment.id} and ${id}`);
    }
    const result = await savePayment(payment);
    return result;
}

async function updatePaymentFields(id, payment) {
    if (id !== payment.id) {
        throw new Error(`Payload and params ids must match, ${payment.id} and ${id}`);
    }
    const result = await updatePayment(payment);
    return result;
}

async function deletePayment(id) {
    const result = await deletePaymentById(id);
    return result;
}

export {
    getAllPayments,
    getPaymentById,
    addPayment,
    updateEntirePayment,
    updatePaymentFields,
    deletePayment
};
