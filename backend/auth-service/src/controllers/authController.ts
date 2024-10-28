import { Request, Response } from 'express';
import { login } from '../services/authService';

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
