import sqlite3 from 'sqlite3';
import { open } from 'sqlite'; // Usaremos sqlite/promises para async/await

const DB_PATH = './db.sqlite'; // Caminho para o arquivo do banco de dados SQLite

let db: any; // Usamos 'any' temporariamente, mas um ORM tiparia isso melhor

export async function initializeDatabase() {
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      createdAt TEXT,
      updatedAt TEXT
    );
  `);
}

export function getDatabase() {
  if (!db) {
    throw new Error('Banco de dados não inicializado. Chame initializeDatabase() primeiro.');
  }
  return db;
}