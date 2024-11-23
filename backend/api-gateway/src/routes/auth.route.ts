import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';

const router = express.Router();

router
    .route('/register')
    .post(registerUser);
    // .get(getAllProductsHandler)

router
    .route('/login')
    .post(loginUser);

// router
//     .route('validate-token')
//     .post(validateToken);


export default router;
