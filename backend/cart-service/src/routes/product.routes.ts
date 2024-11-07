import express from 'express';
import { getProducts, createProduct } from '../controllers/product.controller';

const router = express.Router();

// Route pour récupérer la liste des produits
router.get('/', getProducts);

// Route pour ajouter un produit
router.post('/', createProduct);

export default router;
