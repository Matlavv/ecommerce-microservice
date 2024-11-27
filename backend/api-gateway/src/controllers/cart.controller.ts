import { Request, Response } from 'express';


export const getUserCart = async (req: Request, res: Response) => {
    try {        
        const response = await fetch(`${process.env.CART_SERVICE_URL}/cart/users/${req.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}


export const addProductToCart = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        const response = await fetch(`${process.env.CART_SERVICE_URL}/cart/users/${req.userId}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}

export const getUserCartSuggests = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.CART_SERVICE_URL}/cart/suggests/${req.params.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart suggests');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}