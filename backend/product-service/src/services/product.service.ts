// services/productService.ts
import { prisma } from '../database';
import { Product } from '@prisma/client';

export const createProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.product.create({ data });
};

export const getAllProducts = async () => {
    return await prisma.product.findMany();
};

export const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id },
    });
};

export const updateProduct = async (
    id: number,
    data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
    return await prisma.product.update({
        where: { id },
        data,
    });
};

export const deleteProduct = async (id: number) => {
    await prisma.product.delete({
        where: { id },
    });
};

export const patchProduct = async (
    id: number,
    data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
    return await prisma.product.update({
        where: { id },
        data,
    });
};


export const getProductsByTag = async (tag: string) => {    
    return await prisma.product.findMany({
        where: {
            tags: {
                has: tag,
            },
        },
    });
}