import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cart Service API Documentation',
      version: '1.0.0',
      description: 'Documentation de l\'API pour le microservice de gestion du panier',
    },
    servers: [
      {
        url: 'http://localhost:3003', // Remplacez par l'URL appropriée si différent
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Chemin vers les fichiers contenant les annotations Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
