import { Request, Response } from 'express';
import {
    createProduct,
    getAllProducts,
    updateProduct,
    getProductById,
    deleteProduct,
    patchProduct,
    getProductsByTag
} from '../services/product.service';

export const createProductHandler = async (req: Request, res: Response) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const getAllProductsHandler = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(Number(req.params.id));
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const updateProductHandler = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await updateProduct(Number(req.params.id), req.body);
        res.status(200).json(updatedProduct);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
    try {
        await deleteProduct(Number(req.params.id));
        res.status(200).json({ message: 'Produit supprimé' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const patchProductHandler = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await patchProduct(Number(req.params.id), req.body);
        res.status(200).json(updatedProduct);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const getProductsByTagHandler = async (req: Request, res: Response) => {
    try {        
        const products = await getProductsByTag(req.params.tag);
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}