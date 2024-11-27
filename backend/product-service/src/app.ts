import express from 'express';

// ROUTES IMPORT
import ProductRoute from './routes/product.route';

// SWAGGER IMPORT
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

const app = express();
app.use(express.json());

// ROUTES
app.use('/products', ProductRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('[Product] Server is running!');
});

app.all('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export default app;
