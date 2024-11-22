import express from 'express';
import { getProducts } from '../controllers/product.controller';

const router = express.Router();

router
    .route('/product')
    .get(getProducts)
    // .post(register);

export default router;
