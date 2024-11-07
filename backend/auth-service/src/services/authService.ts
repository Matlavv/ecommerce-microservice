import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JWT_SECRET } from '../config/secrets';

export const login = async (email: string, password: string): Promise<string> => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await PrismaClient.user.findUnique({ where: { email: email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    if (!user || !isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.Id }, JWT_SECRET, { expiresIn: '4h' });

    return token;
};
