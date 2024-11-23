import express from 'express';

// ROUTES IMPORT
import authRoute from './routes/auth.route';
import productRoute from './routes/product.route';


const app = express();
app.use(express.json());

app.use('/auth', authRoute);
app.use('/', productRoute);


app.get('/', (req, res) => {
    res.send('[Api Gateway] Server is running!');
});

app.all('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export default app;
