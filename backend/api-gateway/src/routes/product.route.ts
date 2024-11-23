import express from 'express';
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct, patchProduct } from '../controllers/product.controller';
import { verifyToken, verifyTokenAdmin } from '../middlewares/jwt.middleware';

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(verifyTokenAdmin, createProduct);


router
    .route('/:id')
    .get(getProduct)
    .put(verifyTokenAdmin, updateProduct)
    .patch(verifyTokenAdmin, patchProduct)
    .delete(verifyTokenAdmin, deleteProduct);


export default router;
