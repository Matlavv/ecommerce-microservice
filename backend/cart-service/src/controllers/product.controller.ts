import { Request, Response } from 'express';
import { getProductsService, createProductService } from '../services/product.service';

// Récupérer la liste des produits
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getProductsService();
        res.status(200).json(products);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des produits." });
    }
};

// Ajouter un produit
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, price, quantity } = req.body;

    try {
        const newProduct = await createProductService(name, price, quantity);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Erreur lors de la création du produit:", error);
        res.status(500).json({ error: "Erreur lors de la création du produit." });
    }
};
