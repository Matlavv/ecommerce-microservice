import express from 'express';

import ProductRoute from './routes/productRoute';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const app = express();
const port = 3004;

async function main() {
    app.use(express.json());

    // Enregistrer les routes API
    app.use('/product', ProductRoute);

    app.get('/', (req, res) => {
        res.send('[Product] Server is running !');
    });

    // Capturer les routes non enregistrés
    app.all('*', (req, res) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
