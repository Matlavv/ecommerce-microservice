import { Request, Response } from 'express';
import { addProductToCartService, getCartService, removeProductFromCartService, getCartsWithProductsService, removeCartProductService, getAllCartProductsService, updateProductQuantityInCartService } from '../services/cart.service';

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

export const getCartsWithProductsController = async (req: Request, res: Response):  Promise<void> =>{
    try {
        const result = await getCartsWithProductsService();
        res.status(result.status).json(result);
        return 
    } catch (error) {
        res.status(500).json({ error: error});
        return 
    }
};

// Mise à jour de la quantité d'un produit dans un panier
export const updateProductQuantityInCart = async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body; // Récupère la nouvelle quantité

    if (!quantity || quantity <= 0) {
        res.status(400).json({ error: "La quantité doit être un nombre positif." });
        return;
    }

    try {
        const result = await updateProductQuantityInCartService(parseInt(cartId), parseInt(productId), quantity);
        res.status(result.status).json(result.message);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la quantité dans le panier:", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la quantité dans le panier." });
    }
};



export const removeProductFromCart = async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;

    try {
        const result = await removeProductFromCartService(cartId, productId);
        res.status(result.status).json(result.message);
    } catch (error) {
        console.error("Erreur lors de la suppression du produit du panier:", error);
        res.status(500).json({ error: "Erreur lors de la suppression du produit du panier." });
    }
};



export const getAllCartProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const cartProducts = await getAllCartProductsService();
        res.status(200).json(cartProducts);
    } catch (error) {
        console.error("Erreur lors de la récupération des éléments de CartProduct:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des éléments de CartProduct." });
    }
};



// Supprimer un élément spécifique de CartProduct
export const removeCartProduct = async (req: Request, res: Response): Promise<void> => {
    const { cartProductId } = req.params;

    try {
        const result = await removeCartProductService(parseInt(cartProductId));
        res.status(result.status).json(result.message);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'élément CartProduct:", error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'élément CartProduct." });
    }
};