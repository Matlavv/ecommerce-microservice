import { Router } from 'express';
import usersController from '../controllers/usersController';

const UsersRoute: Router = Router();

UsersRoute.post('/register', usersController.userRegister);

export default UsersRoute;
