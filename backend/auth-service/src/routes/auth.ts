import { Router } from 'express';
import { loginController } from '../controllers/authController';

const authRoutes:Router = Router();

authRoutes.post('/login', loginController);

export default authRoutes
