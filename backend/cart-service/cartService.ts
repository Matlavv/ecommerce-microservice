import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addToCart(cartId: number, productId: number, userId: number) {
    try {
        let cart = await prisma.cart.findUnique({ where: { id: cartId } });
        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (!product) {
            console.error(`Produit avec ID ${productId} introuvable.`);
            return;
        }

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: userId,
                },
            });
            console.log(`Panier avec ID ${cart.id} créé pour l'utilisateur avec ID ${userId}.`);
        }

        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                products: {
                    connect: { id: productId },
                },
            },
        });

        console.log(`Produit avec ID ${productId} ajouté au panier avec ID ${cart.id}.`);
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Nouvelle fonction pour voir les détails du panier
async function viewCartDetails(cartId: number) {
    try {
        const cart = await prisma.cart.findUnique({
            where: { id: cartId },
            include: { products: true },
        });

        if (!cart) {
            console.error(`Panier avec ID ${cartId} introuvable.`);
            return;
        }

        console.log(`Détails du Panier (ID: ${cart.id}):`);
        console.log(`Utilisateur ID: ${cart.userId}`);
        console.log(`Produits:`);

        for (const product of cart.products) {
            console.log(`- Produit ID: ${product.id}, Nom: ${product.name}`);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du panier:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Utilisation de la fonction
addToCart(1, 1, 1); // Remplacez par les ID appropriés pour le panier, le produit et l'utilisateur
viewCartDetails(1); // Remplacez par l'ID du panier que vous souhaitez voir
