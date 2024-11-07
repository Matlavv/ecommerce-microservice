import express from 'express';
import { addProductToCart, getCart, getCartsWithProductsController, removeProductFromCart} from '../controllers/cart.controller';

const router = express.Router();

// Route pour récupérer le panier
router.get('/', getCart);

router.get('/carts-with-products', getCartsWithProductsController);

// Route pour ajouter un produit au panier
router.post('/:cartId/product/:productId', addProductToCart);

router.delete('/:cartId/product/:productId', removeProductFromCart);


export default router;
