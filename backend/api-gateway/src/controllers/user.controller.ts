import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
    try {
        // const newProduct = await createProduct(req.body);

        const response = await fetch('http://user-service:3001/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        

        // if (!response.ok) {
        //     console.log('ressssssss', response);
            
        //     throw new Error('Failed to fetch from auth service');
        // }

        console.log('register controller after fetch');

        const data = await response.json();
        res.status(201).json(data);

        // res.status(201).json(newProduct);
    } catch (e) {
        console.log('eeeeeeeeeee', e);

        res.status(500).json({ error: e });
    }
};
