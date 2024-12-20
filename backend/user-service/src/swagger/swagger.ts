import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'API documentation for the User Management microservice',
        },
        servers: [
            {
                url:
                    process.env.BASE_URL_SWAGGER_USER_SERVICE ||
                    'http://localhost:' + process.env.PORT,
            },
        ],
    },
    apis: ['./api-docs/swagger-doc.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
