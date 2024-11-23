import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return res.status(400).json({ error: errorText });
        }

        const data = await response.json();
        console.log('Data:', data);
        res.status(201).json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            return res.status(400).json({ error: errorText });
        }

        const data = await response.json();
        console.log('Data:', data);
        res.status(200).json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};