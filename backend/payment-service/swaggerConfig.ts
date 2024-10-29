import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Payment API',
            version: '1.0.0',
            description: 'API de gestion des paiements',
        },
        servers: [
            {
                url: 'http://localhost:3005',
            },
        ],
    },
    apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
