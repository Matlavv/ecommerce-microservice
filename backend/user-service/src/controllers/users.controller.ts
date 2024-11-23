import { prisma } from '../app';
import { Request, Response } from 'express';


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

        const newRegister = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password,
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