import * as SQLite from 'expo-sqlite';

let db = null;
// Conexão com o Banco de Dados do Sqlite 

export const setupDatabase = async () => {
  try {
    const openedDb = await SQLite.openDatabaseAsync("database.db");
    setDb(openedDb);
    console.log('Banco de dados aberto com sucesso');
    await createTable(openedDb);// Cria a tabela se não existir
    await insertInitialData(openedDb);// Insere dados iniciais se a tabela estiver vazia
    await fetchUsers(openedDb);// Busca os usuários após a criação da tabela e inserção de dados
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
  }
};
setupDatabase();
, []);

export const createTable = async (database) => {
  await database.execAsync(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, email TEXT UNIQUE, password TEXT);'
  );
  console.log('Tabela users criada ou já existe');

};

const insertInitialData = async (database) => {// Insere dados iniciais se a tabela estiver vazia
  try {
    const result = await database.getFirstAsync('SELECT COUNT(*) as count FROM users;');// Verifica se a tabela está vazia
    if (result.count === 0) {
      await database.withTransactionAsync(async () => {
      await database.runAsync( 'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', ['João', 'joao@example.com', 'password123']);
      await database.runAsync( 'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', ['Maria', 'maria@example.com', 'password456']);       
    });
    console.log('Dados iniciais inseridos na tabela users');
    }
  } catch (error) {
    console.error('Erro ao inserir dados iniciais:', error);
  }
};

const fetchUsers = async (database) => {// Busca todos os usuários da tabela
  try {
    const allUsers = await database.getAllAsync('SELECT * FROM users;');
    setUsers(allUsers);
    console.log('Usuários carregados:', allUsers);
    navigation.navigate('Leads', { users: allUsers }); // Navega para a página de Leads com os usuários carregados
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    Alert.alert('Erro', 'Não foi possível carregar os usuários.');
  }
};