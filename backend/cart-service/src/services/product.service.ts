import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer la liste des produits
export const getProductsService = async () => {
    return await prisma.product.findMany();
};

// Ajouter un produit
export const createProductService = async (name: string, price: number, quantity: number) => {
    if (!name || typeof price !== 'number' || typeof quantity !== 'number') {
        throw new Error('Nom, prix, et quantité sont requis.');
    }

    return await prisma.product.create({
        data: {
            name,
            price,
            quantity,
        },
    });
};
