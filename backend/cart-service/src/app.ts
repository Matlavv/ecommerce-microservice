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

app.post('/product', async (req: Request, res: Response): Promise<void> => {
    const { name, price } = req.body; // Vous pouvez ajouter d'autres champs ici

    try {
        // Créer un nouveau produit dans la base de données
        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
            },
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Erreur lors de la création du produit:", error);
        res.status(500).json({ error: "Erreur lors de la création du produit." });
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


// Endpoint pour ajouter un produit au panier
app.post('/cart/:cartId/product/:productId', async (req: Request, res: Response): Promise<void> => {
    const { cartId, productId } = req.params;

    try {
        const cart = await prisma.cart.findUnique({ where: { id: parseInt(cartId) } });
        const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });

        if (!cart) {
            res.status(404).json({ error: `Panier avec ID ${cartId} introuvable.` });
            return;
        }

        if (!product) {
            res.status(404).json({ error: `Produit avec ID ${productId} introuvable.` });
            return;
        }

        // Ajoute le produit au panier
        await prisma.cart.update({
            where: { id: parseInt(cartId) },
            data: {
                products: {
                    connect: { id: parseInt(productId) },
                },
            },
        });

        res.status(200).json({ message: `Produit avec ID ${productId} ajouté au panier avec ID ${cartId}.` });
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        res.status(500).json({ error: "Erreur lors de l'ajout au panier." });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('YO BG');
});
