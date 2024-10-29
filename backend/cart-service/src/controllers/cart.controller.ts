import { Request, Response } from 'express';
import { addProductToCartService, getCartService } from '../services/cart.service';

// Récupérer le panier
export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await getCartService();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Erreur lors de la récupération des carts:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des carts." });
    }
};

// Ajouter un produit au panier
export const addProductToCart = async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        res.status(400).json({ error: "La quantité doit être un nombre positif." });
        return;
    }

    try {
        const result = await addProductToCartService(cartId, productId, quantity);
        res.status(result.status).json(result.message);
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        res.status(500).json({ error: "Erreur lors de l'ajout au panier." });
    }
};
