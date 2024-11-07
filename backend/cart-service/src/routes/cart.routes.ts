import express from 'express';
import { addProductToCart, getCart, getCartsWithProductsController, removeProductFromCart, removeCartProduct, getAllCartProducts} from '../controllers/cart.controller';

const router = express.Router();

// Route pour récupérer le panier
router.get('/', getCart);

router.get('/carts-with-products', getCartsWithProductsController);

// Route pour ajouter un produit au panier
router.post('/:cartId/product/:productId', addProductToCart);

router.delete('/:cartId/product/:productId', removeProductFromCart);

router.get('/cartproducts', getAllCartProducts);

// Nouvelle route pour supprimer un élément spécifique de CartProduct
router.delete('/cartproduct/:cartProductId', removeCartProduct);

export default router;
