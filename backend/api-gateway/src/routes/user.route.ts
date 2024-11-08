import express from 'express';
import { register } from '../controllers/user.controller';

const router = express.Router();

router
    .route('/register')
    // .get(getAllProductsHandler)
    .post(register);

export default router;
