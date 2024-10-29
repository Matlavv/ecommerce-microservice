import { Request, Response } from 'express';
import { createPaymentIntent, savePaymentToDatabase } from '../services/stripe.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /create-payment-intent:
 *   post:
 *     summary: Créer une intention de paiement
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 1000
 *               currency:
 *                 type: string
 *                 example: usd
 *     responses:
 *       201:
 *         description: Intention de paiement créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 amount:
 *                   type: integer
 *                 currency:
 *                   type: string
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur interne du serveur
 */
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

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Récupérer tous les paiements
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Liste des paiements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   stripePaymentId:
 *                     type: string
 *                   amount:
 *                     type: integer
 *                   currency:
 *                     type: string
 *                   status:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur interne du serveur
 */
export const getPaymentsHandler = async (_: Request, res: Response) => {
    try {
        const payments = await prisma.payment.findMany();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error retrieving payments:', error);
        res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
    }
};
