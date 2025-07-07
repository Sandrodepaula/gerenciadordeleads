export interface User {
  id: string;
  email: string;
  passwordHash: string; // Senha deve ser hashada!
  createdAt: string; // SQLite armazena DATETIME como string
  updatedAt: string; // SQLite armazena DATETIME como string
}