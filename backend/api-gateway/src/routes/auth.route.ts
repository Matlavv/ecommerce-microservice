import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { verifyToken, verifyTokenAdmin } from '../middlewares/jwt.middleware';

const router = express.Router();

router
    .route('/register')
    .post(registerUser);

router
    .route('/login')
    .post(loginUser);

router
    .route('/validate-token')
    .get(verifyToken);


router
    .route('/validate-admin')
    .get(verifyTokenAdmin);



export default router;
