import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import userRoute from './routes/user.route';

// ROUTES IMPORT
// import ProductRoute from './routes/product.route';

const app = express();
app.use(express.json());

app.use('/', userRoute);

// ROUTES
// app.use('/product', ProductRoute);
app.use('/user', createProxyMiddleware({ target: 'localhost:3001', changeOrigin: true }));
app.use('/auth', createProxyMiddleware({ target: 'localhost:3002', changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: 'localhost:3004', changeOrigin: true }));
app.use('/cart', createProxyMiddleware({ target: 'localhost:3003', changeOrigin: true }));
app.use('/payment', createProxyMiddleware({ target: 'localhost:3005', changeOrigin: true }));

// app.get('/test', (req, res) => {
//     res.json({ message: 'Test route is working!' });
// });

app.get('/', (req, res) => {
    res.send('[Api Gateway] Server is running!');
});

app.all('*', (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export default app;
