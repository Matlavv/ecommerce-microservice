import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/secrets';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        const user = await PrismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;
