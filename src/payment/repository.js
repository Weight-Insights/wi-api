import { db } from '../config/firebase.js';

const paymentsCollection = db.collection('payments');

async function findAllPayments() {
    let payments = [];
    const paymentsData = await paymentsCollection.get();
    paymentsData.forEach(u => {payments.push(u.data());});
    return payments;
}

async function findPaymentById(id) {
    const paymentData = await paymentsCollection.doc(id).get();
    return paymentData.data();
}

/**
 * Create a new payment. In case the payment (id) already exists, it will be entirely replaced.
 * @param {*} payment 
 * @returns 
 */
async function savePayment(payment) {
    const result = await paymentsCollection.doc(payment.id).set(payment);
    return result;
}

async function updatePayment(payment) {
    const result = await paymentsCollection.doc(payment.id).update(payment);
    return result;
}

async function deletePaymentById(id) {
    const result = await paymentsCollection.doc(id).delete();
    return result;
}

export {
    findAllPayments,
    findPaymentById,
    savePayment,
    updatePayment,
    deletePaymentById
};
