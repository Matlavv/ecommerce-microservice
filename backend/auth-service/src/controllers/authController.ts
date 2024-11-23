import { login } from '../services/auth.service';
import { Request, Response } from 'express';

import Joi from 'joi';




export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await login(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};



export const registerUser = async (req: Request, res: Response) => {
    try {        
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
        console.log('Data:', data);
        res.status(201).json(data);
        return;

    } catch (error) {
        
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};