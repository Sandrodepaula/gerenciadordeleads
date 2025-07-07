// src/routes/authRoutes.ts
import { Router } from 'express';
import { login, register } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register); // Adicionamos uma rota de registro para testar

export default authRouter;