import express from 'express';
import { addProductToCart, getCart } from '../controllers/cart.controller';

const router = express.Router();

// Route pour récupérer le panier
router.get('/', getCart);

// Route pour ajouter un produit au panier
router.post('/:cartId/product/:productId', addProductToCart);

export default router;
