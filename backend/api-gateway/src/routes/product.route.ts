import express from 'express';
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct, patchProduct } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(verifyToken, createProduct);


router
    .route('/:id')
    .get(getProduct)
    .put(verifyToken, updateProduct)
    .patch(verifyToken, patchProduct)
    .delete(verifyToken, deleteProduct);


export default router;
