import { Request, Response } from 'express';


export const getProducts = async (req: Request, res: Response) => {
    try {
        const response = await fetch('http://product-service:3004/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from auth service');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: e });
    }
};