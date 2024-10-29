import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCartService = async () => {
    return await prisma.cart.findMany();
};

export const addProductToCartService = async (cartId: string, productId: string, quantity: number) => {
    const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });

    if (!product) {
        throw new Error(`Produit avec ID ${productId} introuvable.`);
    }

    if (product.quantity < quantity) {
        throw new Error(`Quantité demandée non disponible. Stock actuel : ${product.quantity}.`);
    }

    let cart = await prisma.cart.findUnique({ where: { id: parseInt(cartId) } });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId: 1, // Remplacez ceci par l'ID de l'utilisateur approprié
                products: {
                    create: {
                        productId: parseInt(productId),
                        quantity,
                    },
                },
            },
        });
        // Mettre à jour la quantité du produit après l'ajout au panier
        await prisma.product.update({
            where: { id: parseInt(productId) },
            data: { quantity: product.quantity - quantity },
        });
        return { status: 201, message: `Panier créé avec ID ${cart.id} et produit ajouté avec quantité ${quantity}.` };
    } else {
        // Ajoutez le produit avec la quantité spécifiée au panier existant
        await prisma.cart.update({
            where: { id: parseInt(cartId) },
            data: {
                products: {
                    create: {
                        productId: parseInt(productId),
                        quantity,
                    },
                },
            },
        });
        // Mettre à jour la quantité du produit après l'ajout au panier
        const updatedQuantity = product.quantity - quantity;
        await prisma.product.update({
            where: { id: parseInt(productId) },
            data: { quantity: updatedQuantity },
        });
        return { status: 200, message: `Produit avec ID ${productId} ajouté au panier avec quantité ${quantity}.` };
    }
};
