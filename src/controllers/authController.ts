
// src/controllers/authController.ts
import { Request, Response } from 'express';
import { LoginRequest, LoginResponse, ErrorResponse, User } from '../types/auth';
import { userRepository } from '../models/userRepository'; // Importa o nosso novo repositório
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_muito_seguro_e_longo_aqui'; // Mantenha isso seguro!
const SALT_ROUNDS = 10; // Custo do hash para bcrypt

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response<LoginResponse | ErrorResponse>) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.', statusCode: 400 });
  }

  try {
    // Busca o usuário pelo e-mail no banco de dados SQLite
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.', statusCode: 401 });
    }

    // Compara a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.', statusCode: 401 });
    }

    // Se as credenciais são válidas, gera um token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token, message: 'Login bem-sucedido!' });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.', statusCode: 500 });
  }
};

// Exemplo de rota para registrar um novo usuário (para testes)
export const register = async (req: Request<{}, {}, LoginRequest>, res: Response<LoginResponse | ErrorResponse>) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.', statusCode: 400 });
  }

  try {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'E-mail já registrado.', statusCode: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await userRepository.createUser(email, hashedPassword);

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ token, message: 'Usuário registrado com sucesso!' });

  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.', statusCode: 500 });
  }
};