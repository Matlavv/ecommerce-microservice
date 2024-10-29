import express from 'express';
import { setupSwagger } from '../swaggerConfig';
import paymentRoutes from './routes/payment.route';

const app = express();
app.use(express.json());

setupSwagger(app);

app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
