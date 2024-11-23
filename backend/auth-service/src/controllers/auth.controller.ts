import { login } from '../services/auth.service';
import { Request, Response } from 'express';
import Joi from 'joi';
import { JWT_SECRET } from '../config/secrets';
const jwt = require('jsonwebtoken');



export const registerUser = async (req: Request, res: Response) => {
    try {
        // Check data
        const userSchema = Joi.object({
            firstname: Joi.string().min(2).max(50),
            lastname: Joi.string().min(2).max(50),
            email: Joi.string().email(),
            password: Joi.string().min(12).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/),
            address: Joi.string().optional(),
            role: Joi.boolean().default(false),
        });

        const { error, value } = userSchema.validate(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        } 

        // Create user
        const response = await fetch(`${process.env.USER_SERVICE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        });


        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            res.status(400).json({ error: errorText });
            return;
        }

        const data = await response.json();
        res.status(201).json(data);
        return;

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Missing email or password' });
            return;
        }

        // Get user
        const userRes = await fetch(`${process.env.USER_SERVICE_URL}/users/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const user = await userRes.json();

        // Check if user exists
        if (!user?.id) {
            console.error('Error: User not found');
            res.status(400).json({ error: 'User not found' });
            return; 
        }

        // Check password and generate token
        const token = await login(user?.id, user?.password, password);        

        if (!token) {
            console.error("Error: Invalid credentials");
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        res.status(200).json({ token });
        return;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
}

export const validateToken = async (req: Request, res: Response) => {
    
    let userToken = req.header('Authorization');    
    
    // Check if token is present
    if (!userToken) {
        return res.status(403).json({ authError: 'Access forbidden: missing token' })
    }

    // Remove 'Bearer ' from token
    if (userToken.startsWith('Bearer ')) {
        userToken = userToken.split(' ')[1];
    }

    // Verify token
    const payload = await new Promise((resolve, reject) => {
        jwt.verify(userToken, JWT_SECRET, (error, decoded) => {
            if (error) {
                reject(error);
                res.status(400).json({ 
                    message: 'Invalide token', 
                    isValid: false 
                });
                return;

            } else {
                resolve(decoded);
                res.status(200).json({ 
                    message: 'Token is valid', 
                    isValid: true, 
                    userId: decoded.userId 
                });
            }
        });
    });

    return;
}