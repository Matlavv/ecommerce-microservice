import { prisma } from '../database';
import { Request, Response } from 'express';

const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, tags, reference, licences, stock_quantity, category, image_url, price } = req.body;
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                tags,
                reference,
                licences,
                stock_quantity,
                category,
                image_url,
                price
            },
        });
        res.status(200).json(newProduct);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, tags, reference, licences, stock_quantity, category, image_url, price } = req.body;
        const updatedProduct = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: {
                name,
                description,
                tags,
                reference,
                licences,
                stock_quantity,
                category,
                image_url,
                price
            },
        });
        res.status(200).json(updatedProduct);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: Number(id) },
        });

        res.status(200);
        res.json({ message: "Produit supprimé" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const patchProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: req.body, 
        });

        res.status(200).json(updatedProduct);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};


export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    patchProduct,
};
