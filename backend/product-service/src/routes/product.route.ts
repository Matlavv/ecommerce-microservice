import express from 'express';
import {
    getAllProductsHandler,
    createProductHandler,
    getProductByIdHandler,
    updateProductHandler,
    patchProductHandler,
    deleteProductHandler,
} from '../controllers/product.controller';

const router = express.Router();

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: A list of products
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product A"
 *               description:
 *                 type: string
 *               tags:
 *                 type: string
 *               reference:
 *                 type: string
 *               licences:
 *                 type: string
 *               stock_quantity:
 *                 type: integer
 *               category:
 *                 type: string
 *               image_url:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.route('/').get(getAllProductsHandler).post(createProductHandler);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 *   patch:
 *     summary: Partially update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product patched successfully
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router
    .route('/:id')
    .get(getProductByIdHandler)
    .put(updateProductHandler)
    .patch(patchProductHandler)
    .delete(deleteProductHandler);

export default router;
