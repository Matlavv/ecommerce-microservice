import express from 'express';
import { getUserCart, addProductToCart } from '../controllers/cart.controller';
import { verifyToken, verifyTokenAdmin } from '../middlewares/jwt.middleware';

const router = express.Router();

// Get user cart products
router
    .route('/')
    .get(verifyToken, getUserCart);

// Add product to user cart
router
    .route('/product/:productId')
    .post(verifyToken, addProductToCart);


export default router;