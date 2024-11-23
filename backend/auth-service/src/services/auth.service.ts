import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/secrets';

export const login = async (userId: number, accountPassword: string, reqPassword: string): Promise<string> => {
    
    const isPasswordValid = await bcrypt.compare(reqPassword, accountPassword);
    
    if (!isPasswordValid) {        
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1d' });

    return token;
};
