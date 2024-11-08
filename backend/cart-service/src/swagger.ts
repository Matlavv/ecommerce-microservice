import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig';

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger UI disponible à http://localhost:3003/api-docs');
}
