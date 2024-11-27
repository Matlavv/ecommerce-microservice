import express from 'express';
import {
    addProductToCart,
    getUserCart,
    getCartsWithProductsController,
    removeProductFromCart,
    removeCartProduct,
    getAllCartProducts,
    updateProductQuantityInCart,
    getCartSuggests
} from '../controllers/cart.controller';

const router = express.Router();

// Route pour récupérer le panier de l'utilisateur
router.get('/users/:userId', getUserCart);

// router.get('/carts-with-products', getCartsWithProductsController);

// Route pour ajouter un produit au panier de l'utilisateur
router.post('/users/:userId/product/:productId', addProductToCart);


router.get('/suggests/:userId', getCartSuggests);


router.put('/:cartId/cartproducts/:productId', updateProductQuantityInCart);

router.delete('/:cartId/product/:productId', removeProductFromCart);

router.get('/cartproducts', getAllCartProducts);

// Nouvelle route pour supprimer un élément spécifique de CartProduct
router.delete('/cartproduct/:cartProductId', removeCartProduct);

export default router;
