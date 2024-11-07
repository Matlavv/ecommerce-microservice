import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CartProduct { // Définissez un type personnalisé
    id: number;
    productId: number;
    quantity: number;
}

export const getCartService = async () => {
    return await prisma.cart.findMany();
};

export const getCartsWithProductsService = async () => {
    try {
        // Récupérer tous les paniers avec leurs produits
        const carts: Cart[] = await prisma.cart.findMany({
            include: {
                products: {
                    include: {
                        product: true, // Inclure les détails des produits associés
                    },
                },
            },
        });

        // Filtrer les paniers qui ont des produits
        const cartsWithProducts = carts.filter((cart: Cart) => cart.products.length > 0);

        return { status: 200, carts: cartsWithProducts };
    } catch (error) {
        console.error("Erreur dans getCartsWithProductsService:", error);
        throw new Error("Erreur lors de la récupération des paniers avec produits.");
    }
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

export const updateProductQuantityInCartService = async (cartId: number, productId: number, quantity: number) => {
    try {
        // Mise à jour de la quantité pour un produit spécifique dans un panier
        await prisma.cartProduct.updateMany({
            where: {
                cartId: cartId,
                productId: productId
            },
            data: {
                quantity: quantity
            }
        });

        return { status: 200, message: "Quantité mise à jour avec succès dans le panier." };
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la quantité dans le panier:", error);
        return { status: 500, message: "Erreur lors de la mise à jour de la quantité dans le panier." };
    }
};


export const removeProductFromCartService = async (cartId: string, productId: string) => {
    try {
        // Trouver le panier avec les produits
        const cart = await prisma.cart.findUnique({
            where: { id: parseInt(cartId) },
            include: { products: true },
        });

        if (!cart) {
            throw new Error(`Panier avec ID ${cartId} introuvable.`);
        }

        // console.log(`Contenu du panier : ${JSON.stringify(cart)}`);

        const cartProduct = cart.products.find((item: CartProduct) => item.productId === parseInt(productId));

        if (!cartProduct) {
            throw new Error(`Produit avec ID ${productId} non trouvé dans le panier.`);
        }

        // console.log(`Produit trouvé dans le panier : ${cartProduct.id}`);

        // Supprimer le produit du panier
        await prisma.cartProduct.delete({
            where: { id: cartProduct.id }, // Suppression du produit dans le panier
        });

        // console.log(`Produit avec ID ${productId} supprimé du panier ${cartId}.`);

        return { status: 200, message: `Produit avec ID ${productId} supprimé du panier.` };
    } catch (error) {
        console.error("Erreur dans removeProductFromCartService:", error);
        throw new Error("Erreur lors de la suppression du produit du panier.");
    }
};

export const getAllCartProductsService = async () => {
    try {
        const cartProducts = await prisma.cartProduct.findMany(); // Utilisez 'cartProduct' ici
        return cartProducts;
    } catch (error) {
        console.error("Erreur dans getAllCartProductsService:", error);
        throw new Error("Erreur lors de la récupération des éléments de CartProduct.");
    }
};


// Service pour supprimer un élément spécifique de CartProduct
export const removeCartProductService = async (cartProductId: number) => {
    try {
        // Vérifier si l'élément CartProduct existe
        const cartProduct = await prisma.cartProduct.findUnique({
            where: { id: cartProductId },
        });

        if (!cartProduct) {
            return { status: 404, message: "Élément CartProduct non trouvé." };
        }

        // Supprimer l'élément CartProduct
        await prisma.cartProduct.delete({
            where: { id: cartProductId },
        });

        return { status: 200, message: "Élément CartProduct supprimé avec succès." };
    } catch (error) {
        console.error("Erreur dans removeCartProductService:", error);
        throw new Error("Erreur lors de la suppression de l'élément CartProduct.");
    }
};