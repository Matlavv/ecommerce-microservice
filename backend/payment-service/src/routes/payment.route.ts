import { Router } from 'express';
import { createPaymentIntentHandler, getPaymentsHandler } from '../controllers/payment.controller';
import { healthCheckHandler } from '../controllers/health.controller';

const router = Router();

router.get('/health', healthCheckHandler);
router.post('/create-payment-intent', createPaymentIntentHandler);
router.get('/payments', getPaymentsHandler);

export default router;
