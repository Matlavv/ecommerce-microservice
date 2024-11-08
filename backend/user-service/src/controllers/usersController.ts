import { prisma } from '../app';
import { Request, Response } from 'express';

const userRegister = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password, address, role } = req.body;

        // Validation des champs obligatoires
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validation des types de données
        if (
            typeof firstname !== 'string' ||
            typeof lastname !== 'string' ||
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof address !== 'string'
        ) {
            return res.status(400).json({ error: 'Invalid data types' });
        }

        // Validation du format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validation de la complexité du mot de passe
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,}$/; // Minimum 8 caractères, au moins une lettre et un chiffre
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: 'Password must be at least 12 characters long and contain at least one letter and one number',
            });
        }

        // Vérifier si l'utilisateur existe déjà
        const userExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExist) {
            return res.status(400).json({ error: 'Adresse email deja utiliser' });
        }

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

const getUser = async (req: Request, res: Response) => {
    
    try {
        const users = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(users);
        if (!users) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};

const userUpdate = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password, address} = req.body;
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                firstname,
                lastname,
                email,
                password,
                address,
            },
        });
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
}

const userDelete = async (req: Request, res: Response) => {
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(deleteUser);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
}

export default {
    userRegister,
    getUser,
    userUpdate,
    userDelete,
};
