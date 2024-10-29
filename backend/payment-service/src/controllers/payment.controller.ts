import { Request, Response } from 'express';
import { createPaymentIntent, savePaymentToDatabase } from '../services/stripe.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPaymentIntentHandler = async (req: Request, res: Response) => {
    const { amount, currency } = req.body;

    if (!amount) {
        res.status(400).json({ error: 'Amount is required' });
        return;
    }

    try {
        const paymentIntent = await createPaymentIntent(amount, currency || 'usd');
        await savePaymentToDatabase(paymentIntent);
        res.status(201).json(paymentIntent);
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
    }
};

export const getPaymentsHandler = async (_: Request, res: Response) => {
    try {
        const payments = await prisma.payment.findMany();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error retrieving payments:', error);
        res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
    }
};
