import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const healthCheckHandler = async (req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ message: 'API is running and connected to PostgreSQL' });
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({
            message: 'Database connection failed',
            error: (error as Error).message,
        });
    }
};
