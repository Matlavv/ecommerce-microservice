import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            { name: 'Product 1', price: 10.0 },
            { name: 'Product 2', price: 20.0 },
            { name: 'Product 3', price: 30.0 },
        ],
    });
}

main()
    .catch(e => {
        console.error(e);
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
