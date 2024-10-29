import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payment.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(paymentRoutes);

export default app;
