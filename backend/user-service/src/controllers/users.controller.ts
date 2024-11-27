import { prisma } from '../app';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password, address, role } = req.body;
        
        // Check if user exists
        const userExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (userExist) return res.status(400).json({ error: 'Adresse email deja utilisé' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newRegister = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                address,
                role,
            },
        });

        res.status(200).json(newRegister);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
}


export const getUser = async (req: Request, res: Response) => {    
    try {
        const users = await prisma.user.findUnique({
            where: {
                email: req.params.email_user,
            },
        });
        if (!users) return res.status(404).json({ error: 'User does not exist' });

        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
}