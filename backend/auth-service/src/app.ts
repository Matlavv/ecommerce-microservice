import express from 'express';
import swaggerSetup from './swagger';
import authRoutes from './routes/auth.route';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('[Auth] Server is running!');
});

app.all('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

swaggerSetup(app);


export default app;