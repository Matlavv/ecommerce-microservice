import express from 'express';
import { getProducts } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router = express.Router();

router
    .route('/product')
    .get(verifyToken, getProducts)
    // .post(register);

export default router;
