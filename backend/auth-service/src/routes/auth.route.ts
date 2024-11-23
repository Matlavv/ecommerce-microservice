import express from 'express';
import { registerUser, loginUser, validateToken } from '../controllers/auth.controller';


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */



router
    .route('/register')
    .post(registerUser);

router
    .route('/login')
    .post(loginUser);

router
    .route('/validate-token')
    .get(validateToken);

    
export default router;