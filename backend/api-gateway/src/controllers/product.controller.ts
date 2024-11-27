import { Request, Response } from 'express';


export const getProducts = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
};


export const getProduct = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${req.params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${req.params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${req.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}


export const patchProduct = async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${req.params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error('Failed to patch product');
        }

        const data = await response.json();
        res.status(201).json(data);

    } catch (e) {
        console.log('error', e);
        res.status(500).json({ error: (e as Error).message });
    }
}