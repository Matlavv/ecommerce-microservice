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

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Récupère le panier de l'utilisateur
 *     responses:
 *       200:
 *         description: Panier récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartId:
 *                   type: integer
 *                   example: 1
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', getCart);

/**
 * @swagger
 * /cart/carts-with-products:
 *   get:
 *     summary: Récupère les paniers avec les produits
 *     responses:
 *       200:
 *         description: Paniers récupérés avec succès
 */
router.get('/carts-with-products', getCartsWithProductsController);

/**
 * @swagger
 * /cart/{cartId}/product/{productId}:
 *   post:
 *     summary: Ajoute un produit au panier
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit ajouté au panier avec succès
 */
router.post('/:cartId/product/:productId', addProductToCart);

/**
 * @swagger
 * /cart/{cartId}/cartproducts/{productId}:
 *   put:
 *     summary: Met à jour la quantité d'un produit dans le panier
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quantité mise à jour avec succès
 */
router.put('/:cartId/cartproducts/:productId', updateProductQuantityInCart);

/**
 * @swagger
 * /cart/{cartId}/product/{productId}:
 *   delete:
 *     summary: Supprime un produit du panier
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit supprimé du panier avec succès
 */
router.delete('/:cartId/product/:productId', removeProductFromCart);

/**
 * @swagger
 * /cart/cartproducts:
 *   get:
 *     summary: Récupère tous les produits de tous les paniers
 *     responses:
 *       200:
 *         description: Produits récupérés avec succès
 */
router.get('/cartproducts', getAllCartProducts);

/**
 * @swagger
 * /cart/cartproduct/{cartProductId}:
 *   delete:
 *     summary: Supprime un élément spécifique de CartProduct
 *     parameters:
 *       - name: cartProductId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Élément supprimé de CartProduct avec succès
 */
router.delete('/cartproduct/:cartProductId', removeCartProduct);

export default router;
