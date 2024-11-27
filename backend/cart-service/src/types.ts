interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}

interface CartProduct {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    product: Product; // Inclure les détails du produit
}

interface Cart {
    id: number;
    userId: number;
    products: CartProduct[]; // Liste des produits dans le panier
}
