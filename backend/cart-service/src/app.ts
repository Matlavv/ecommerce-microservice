import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 3003;
const prisma = new PrismaClient();

// Middleware pour parser le JSON
app.use(express.json());

// Fonction de connexion à la base de données
async function connectToDb() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}
connectToDb();

// Route de base pour tester si le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Endpoint pour récupérer la liste des produits
app.get('/products', async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des produits." });
    }
});


app.get('/cart', async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await prisma.cart.findMany(); // Remplacer 'product' par 'cart'
        res.status(200).json(cart);
    } catch (error) {
        console.error("Erreur lors de la récupération des carts:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des carts." });
    }
});

// Endpoint pour ajouter un produit
app.post('/product', async (req: Request, res: Response): Promise<void> => {
    const { name, price, quantity } = req.body;

    try {
        // Valider les données entrantes
        if (!name || typeof price !== 'number' || typeof quantity !== 'number') {
            res.status(400).json({ error: "Nom, prix, et quantité sont requis." });
            return;
        }

        // Créer le produit
        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
                quantity, // Assurez-vous que le champ quantity est correctement référencé ici
            },
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Erreur lors de la création du produit:", error);
        res.status(500).json({ error: "Erreur lors de la création du produit." });
    }
});

// app.post('/cart/:cartId/product/:productId', async (req: Request, res: Response): Promise<void> => {
//     const { cartId, productId } = req.params;
//     console.log(`Request received to add product ${productId} to cart ${cartId}`);

//     try {
//         const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });
//         console.log(`Product found: ${product}`);

//         if (!product) {
//             res.status(404).json({ error: `Produit avec ID ${productId} introuvable.` });
//             return;
//         }

//         let cart = await prisma.cart.findUnique({ where: { id: parseInt(cartId) } });
//         console.log(`Cart found: ${cart}`);

//         if (!cart) {
//             cart = await prisma.cart.create({
//                 data: {
//                     userId: 1, // Changez ceci si nécessaire
//                     products: {
//                         connect: { id: parseInt(productId) },
//                     },
//                 },
//             });
//             res.status(201).json({ message: `Panier créé avec ID ${cart.id} et produit ajouté.` });
//         } else {
//             await prisma.cart.update({
//                 where: { id: parseInt(cartId) },
//                 data: {
//                     products: {
//                         connect: { id: parseInt(productId) },
//                     },
//                 },
//             });
//             res.status(200).json({ message: `Produit avec ID ${productId} ajouté au panier avec ID ${cartId}.` });
//         }
//     } catch (error) {
//         console.error("Erreur lors de l'ajout au panier:", error);
//         res.status(500).json({ error: "Erreur lors de l'ajout au panier." });
//     }
// });





// Démarrer le serveur

// Endpoint pour ajouter un produit avec une quantité au panier

app.post('/cart/:cartId/product/:productId', async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        res.status(400).json({ error: "La quantité doit être un nombre positif." });
        return;
    }

    try {
        // Vérifiez si le produit existe et que la quantité est disponible en stock
        const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });

        if (!product) {
            res.status(404).json({ error: `Produit avec ID ${productId} introuvable.` });
            return;
        }

        if (product.quantity < quantity) {
            res.status(400).json({ error: `Quantité demandée non disponible. Stock actuel : ${product.quantity}.` });
            return;
        }

        // Vérifiez si le panier existe, sinon créez-le
        let cart = await prisma.cart.findUnique({ where: { id: parseInt(cartId) } });

        if (!cart) {
            // Créez un nouveau panier avec le produit
            cart = await prisma.cart.create({
                data: {
                    userId: 1, // Remplacez ceci par l'ID de l'utilisateur approprié
                    products: {
                        create: {
                            productId: parseInt(productId),
                            quantity: quantity,
                        },
                    },
                },
            });
            res.status(201).json({ message: `Panier créé avec ID ${cart.id} et produit ajouté avec quantité ${quantity}.` });
        } else {
            // Ajoutez le produit avec la quantité demandée au panier existant
            await prisma.cart.update({
                where: { id: parseInt(cartId) },
                data: {
                    products: {
                        create: {
                            productId: parseInt(productId),
                            quantity: quantity,
                        },
                    },
                },
            });
            res.status(200).json({ message: `Produit avec ID ${productId} ajouté au panier avec quantité ${quantity}.` } );
        }

        // Mettez à jour la quantité du produit en déduisant la quantité demandée
        const updatedQuantity = product.quantity - quantity; // Calculer la quantité mise à jour

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(productId) },
            data: { quantity: updatedQuantity }, // Utiliser la quantité mise à jour
        });

        // Si la quantité tombe à zéro, supprimez le produit
        if (updatedProduct.quantity <= 0) {
            await prisma.product.delete({
                where: { id: parseInt(productId) },
            });
            res.status(200).json({ message: `Produit avec ID ${productId} supprimé du stock après ajout au panier.` });
        } else {
            res.status(201).json({ 
                message: `Produit avec ID ${productId} ajouté au panier. Quantité restante : ${updatedProduct.quantity}.` 
            });
        }

    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        const errorMessage = (error as Error).message || "Erreur inconnue.";
        res.status(500).json({ error: "Erreur lors de l'ajout au panier.", details: errorMessage });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('YO BG');
});
