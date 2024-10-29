import express from 'express';
import { getAllProductsHandler, createProductHandler, getProductByIdHandler, updateProductHandler, patchProductHandler, deleteProductHandler } from '../controllers/product.controller';

const router = express.Router();

router
    .route('/')
    .get(getAllProductsHandler)
    .post(createProductHandler);

router
    .route('/:id')
    .get(getProductByIdHandler)
    .put(updateProductHandler)
    .patch(patchProductHandler)
    .delete(deleteProductHandler);

export default router;