import Stripe from 'stripe';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-09-30.acacia',
});

const prisma = new PrismaClient();

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const savePaymentToDatabase = async (paymentIntent: Stripe.PaymentIntent) => {
  try {
    const payment = await prisma.payment.create({
      data: {
        stripePaymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      },
    });
    console.log('Payment saved to database:', payment);
    return payment;
  } catch (error) {
    console.error('Error saving payment to database:', error);
    throw error;
  }
};
