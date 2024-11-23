import express from 'express';
import { createUser } from '../controllers/users.controller';


const router = express.Router();


router
    .route('/')
    .post(createUser);
    



export default router;