import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CartProduct {
    // Définissez un type personnalisé
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
        console.error('Erreur dans getCartsWithProductsService:', error);
        throw new Error('Erreur lors de la récupération des paniers avec produits.');
    }
};

export const addProductToCartService = async (
    userId: number,
    productId: string,
    quantity: number,
) => {

    
    // Check if product exists
    const res = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const product = await res.json();

    
    if (!product) {
        throw new Error(`Produit avec ID ${productId} introuvable.`);
    }

    if (product.stock_quantity < quantity) {
        throw new Error(`Quantité demandée non disponible. Stock actuel : ${product.stock_quantity}.`);
    }

    // Get user cart
    let cart = await prisma.cart.findFirst({ where: { userId: userId } });
    
    // If user cart does not exist, create one
    if (!cart) {        
        cart = await prisma.cart.create({
            data: {
                userId: userId,
            },
        });
        
        cart = cart;        
    }

    // Mettre à jour la quantité du produit après l'ajout au panier
    const updatedQuantity = product.stock_quantity - quantity;

    const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock_quantity: updatedQuantity }),
    });


    // Check if product is already in cart
    let cartProduct = await prisma.cartProduct.findFirst({ 
        where: {
            cartId: cart.id,
            productId: parseInt(productId)
        }
    });
    
    // If product is not in cart, add it
    if (!cartProduct) {
        cartProduct = await prisma.cartProduct.create({
            data: {
                cartId: cart.id,
                productId: parseInt(productId),
                quantity: quantity,
            },
        });

        return {
            status: 200,
            message: `Produit avec ID ${productId} ajouté au panier avec quantité ${quantity}.`,
        };
    } else {
        await prisma.cartProduct.update({
            where: { id: cartProduct.id },
            data: { quantity: cartProduct.quantity + quantity },
        });

        return {
            status: 200,
            message: `Produit avec ID ${productId} mis à jour dans le panier avec quantité ${cartProduct.quantity + quantity}.`,
        };
    }

};

export const updateProductQuantityInCartService = async (
    cartId: number,
    productId: number,
    quantity: number,
) => {
    try {
        // Mise à jour de la quantité pour un produit spécifique dans un panier
        await prisma.cartProduct.updateMany({
            where: {
                cartId: cartId,
                productId: productId,
            },
            data: {
                quantity: quantity,
            },
        });

        return { status: 200, message: 'Quantité mise à jour avec succès dans le panier.' };
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la quantité dans le panier:', error);
        return {
            status: 500,
            message: 'Erreur lors de la mise à jour de la quantité dans le panier.',
        };
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

        const cartProduct = cart.products.find(
            (item: CartProduct) => item.productId === parseInt(productId),
        );

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
        console.error('Erreur dans removeProductFromCartService:', error);
        throw new Error('Erreur lors de la suppression du produit du panier.');
    }
};

export const getAllCartProductsService = async () => {
    try {
        const cartProducts = await prisma.cartProduct.findMany(); // Utilisez 'cartProduct' ici
        return cartProducts;
    } catch (error) {
        console.error('Erreur dans getAllCartProductsService:', error);
        throw new Error('Erreur lors de la récupération des éléments de CartProduct.');
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
            return { status: 404, message: 'Élément CartProduct non trouvé.' };
        }

        // Supprimer l'élément CartProduct
        await prisma.cartProduct.delete({
            where: { id: cartProductId },
        });

        return { status: 200, message: 'Élément CartProduct supprimé avec succès.' };
    } catch (error) {
        console.error('Erreur dans removeCartProductService:', error);
        throw new Error("Erreur lors de la suppression de l'élément CartProduct.");
    }
};
