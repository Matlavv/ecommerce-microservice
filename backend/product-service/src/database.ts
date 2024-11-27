import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (e) {
        console.error('Error connecting to the database:', e);
        await prisma.$disconnect();
        process.exit(1);
    }
};
