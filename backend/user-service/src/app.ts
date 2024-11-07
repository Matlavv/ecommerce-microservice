import express from 'express';
import { PrismaClient } from '@prisma/client';
import UsersRoute from './routes/usersRoutes';

const app = express();
export const prisma = new PrismaClient();




const PORT = process.env.PORT || 3000;

async function main() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Enregistrer les routes API
    app.use('/users', UsersRoute);

    app.get('/', (req, res) => {
        res.send('[USERS] Server is running !');
    });

    // // Capturer les routes non enregistrés
    // app.all('*', (req, res) => {
    //     res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    // });

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
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