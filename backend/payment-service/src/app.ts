import express from 'express';
import { setupSwagger } from '../swaggerConfig';
import paymentRoutes from './routes/payment.route';

const app = express();
app.use(express.json());

setupSwagger(app);

app.use('/', paymentRoutes);

export default app;
