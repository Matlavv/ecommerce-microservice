import express from 'express';
import { createUser, getUser } from '../controllers/users.controller';


const router = express.Router();


router
    .route('/')
    .post(createUser)
    .get(getUser);
    
    
router
    .route('/:email_user')
    .get(getUser);


export default router;