import request from 'supertest';
import app from '../api-gateway/src/app';

describe('API Gateway', () => {
    it('should return a running message on the root route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('[Api Gateway] Server is running!');
    });

    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/unknown-route');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Route /unknown-route not found' });
    });

    it('should handle /auth routes', async () => {
        const response = await request(app).get('/auth');
        expect(response.status).not.toBe(404);
    });

    it('should handle /products routes', async () => {
        const response = await request(app).get('/products');
        expect(response.status).not.toBe(404);
    });

    it('should handle /cart routes', async () => {
        const response = await request(app).get('/cart');
        expect(response.status).not.toBe(404);
    });
});
