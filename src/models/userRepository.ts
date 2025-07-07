// src/models/userRepository.ts
import { getDatabase } from '../database';
import { User } from '../types/auth';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

// Instale 'uuid' e '@types/uuid'
// npm install uuid @types/uuid

class UserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const db = getDatabase();
    // Usa 'get' para retornar apenas uma linha
    const user = await db.get<User>('SELECT * FROM users WHERE email = ?', [email]);
    return user;
  }

  async createUser(email: string, passwordHash: string): Promise<User> {
    const db = getDatabase();
    const id = uuidv4();
    const now = new Date().toISOString(); // Para createdAt e updatedAt

    await db.run(
      'INSERT INTO users (id, email, passwordHash, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
      [id, email, passwordHash, now, now]
    );

    // Retorna o usuário recém-criado (ou busca-o para garantir todos os campos)
    const newUser = await this.findByEmail(email);
    if (!newUser) {
      throw new Error('Erro ao criar usuário, não foi possível recuperá-lo.');
    }
    return newUser;
  }
}

export const userRepository = new UserRepository();