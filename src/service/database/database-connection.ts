import * as SQLite from 'expo-sqlite';

let db = null;
// Conexão com o Banco de Dados do Sqlite 

export const createTable = async (database) => {
  await database.execAsync(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, email TEXT, password TEXT);'
  );
  console.log('Tabela users criada ou já existe');

  await database.execAsync(
    'CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, cell TEXT, city TEXT, stateUf TEXT);'
  );
  console.log('Tabela leads criada ou já existe');
};

export const setupDatabase = async () => {
  try {
    if(!db){
      db = await SQLite.openDatabaseAsync("database.db");
      console.log('Banco de dados aberto com sucesso');
      await createTable(db);// Cria a tabela se não existir
    }
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
  }
};
setupDatabase();

export const insertInitialData = async () => {// Insere dados iniciais se a tabela estiver vazia
  try {
    const UserCountResult = await db.getFirstAsync('SELECT COUNT(*) as count FROM users;');// Verifica se a tabela está vazia
    if (UserCountResult.count === 0) {
      await db.withTransactionAsync(async () => {
      await db.runAsync( 'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', ['João', 'joao@example.com', 'password123']);
      await db.runAsync( 'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', ['Maria', 'maria@example.com', 'password456']);       
    });
    console.log('Dados iniciais inseridos na tabela users');
    }
  } catch (error) {
    console.error('Erro ao inserir dados iniciais:', error);
    }
};

// --Insere dados iniciais na tabela leads se estiver vazia --
const insertInitialLeadsData = async () => {
try {
  const LeadCountResult = await db.getFirstAsync('SELECT COUNT(*) as count FROM leads;');// Verifica se a tabela está vazia
  if (LeadCountResult && LeadCountResult.count === 0) {    
      await db.withTransactionAsync(async () => {
      await db.runAsync( 'INSERT INTO leads (name, email, cell, city, stateUf) VALUES (?, ?, ?, ?, ?)', ['Carlos Silva', 'carlos@yahoo.com', '11999999999', 'São Paulo', 'SP']);
      });
      console.log('Dados iniciais inseridos na tabela leads');
      } 
  } catch (error) {
    console.error('Erro ao inserir dados iniciais na tabela leads:', error);
    }
};

/**
 * Busca todos os usuários da tabela.
 * @returns {Promise<Array>} Retorna a lista de usuários.
 */
export const fetchUsers = async (): Promise<Array<any>> => {
  if(!db) {
    await setupDatabase();
  }
  try {
    const allUsers = await db.getAllAsync('SELECT * FROM users;');
    return allUsers;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

export const addUser = async (fullName: string, email: string, password: string) => {
  if(!db) {
    await setupDatabase();// Garante que o banco de dados esteja configurado
  }
  try {
    await db.runAsync(
      'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?);',
      [fullName, email, password]
    );
    console.log('Usuário adicionado com sucesso');
    await fetchUsers(); // Atualiza a lista de usuários após a inserção
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    
  }
};

/**
 * Deleta um usuário pelo ID.
 * @param {number} id - ID do usuário a ser deletado
 */
export const deleteUser = async (id: number) => {
  if(!db) {
    await setupDatabase();// Garante que o banco de dados esteja configurado
  }
  try {
    await db.runAsync('DELETE FROM users WHERE id = ?;', [id]);
    console.log('Usuário deletado com sucesso');
    await fetchUsers(); // Atualiza a lista de usuários após a deleção
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    
  }
};

/**
 * Busca todos os clientes da tabela.
 * @returns {Promise<Array>} Retorna a lista de clientes.
 */
export const fetchLeads = async (): Promise<Array<any>> => {
  if(!db) {
    await setupDatabase();
  }
  try {
    const allLeads = await db.getAllAsync('SELECT * FROM leads;');
    return allLeads;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }
};

export const addLeads = async (name: string, email: string, cell: string, city: string, stateUf: string ) => {
  if(!db) {
    await setupDatabase();// Garante que o banco de dados esteja configurado
  }
  try {
    await db.runAsync(
      'INSERT INTO leads (name, email, cell) VALUES (?, ?, ?);',
      [name, email, cell, city, stateUf]
    );
    console.log('Cliente adicionado com sucesso');
    await fetchLeads(); // Atualiza a lista de usuários após a inserção
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    
  }
};

/**
 * Deleta um cliente pelo ID.
 * @param {number} id - ID do cliente a ser deletado
 */
export const deleteLead = async (id: number) => {
  if(!db) {
    await setupDatabase();// Garante que o banco de dados esteja configurado
  }
  try {
    await db.runAsync('DELETE FROM leads WHERE id = ?;', [id]);
    console.log('Cliente deletado com sucesso');
    await fetchLeads(); // Atualiza a lista de clientes após a deleção
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    
  }
};