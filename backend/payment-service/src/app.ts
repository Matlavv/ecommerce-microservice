import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createPaymentIntent, savePaymentToDatabase } from './stripeService';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ message: 'Connected to PostgreSQL' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed', error: (error as Error).message });
  }
});

app.post('/create-payment-intent', async (req: Request, res: Response): Promise<void> => {
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
});

export default app;  
