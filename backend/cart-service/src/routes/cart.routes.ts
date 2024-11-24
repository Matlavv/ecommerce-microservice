import express from 'express';
import {
    addProductToCart,
    getCart,
    getCartsWithProductsController,
    removeProductFromCart,
    removeCartProduct,
    getAllCartProducts,
    updateProductQuantityInCart,
} from '../controllers/cart.controller';

const router = express.Router();

// Route pour récupérer le panier
router.get('/', getCart);

// router.get('/carts-with-products', getCartsWithProductsController);

// Route pour ajouter un produit au panier
router.post('/product/:productId', addProductToCart);



router.put('/:cartId/cartproducts/:productId', updateProductQuantityInCart);

router.delete('/:cartId/product/:productId', removeProductFromCart);

router.get('/cartproducts', getAllCartProducts);

// Nouvelle route pour supprimer un élément spécifique de CartProduct
router.delete('/cartproduct/:cartProductId', removeCartProduct);

export default router;
