import { Router } from 'express';
import usersController from '../controllers/usersController';

const UsersRoute: Router = Router();

UsersRoute.post('/register', usersController.userRegister);
UsersRoute.get('/infos/:id', usersController.getUser);
UsersRoute.put('/update/:id', usersController.userUpdate);
UsersRoute.delete('/delete/:id', usersController.userDelete);

export default UsersRoute;
