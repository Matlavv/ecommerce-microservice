import express from 'express';
import { PrismaClient } from '@prisma/client';
import cartRoutes from './routes/cart.routes';
import productRoutes from './routes/product.routes'; // Importer les routes de produit
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3003;
const prisma = new PrismaClient();

// Middleware pour parser le JSON
app.use(express.json());

// Configuration Swagger
setupSwagger(app);

// Fonction de connexion à la base de données
async function connectToDb() {
    try {
        await prisma.$connect();
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}
connectToDb();

// Route de base pour tester si le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Server is running petit bg');
});

// Utiliser les routes du panier
app.use('/cart', cartRoutes);

// Utiliser les routes des produits
app.use('/products', productRoutes); // Ajout des routes des produits

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
