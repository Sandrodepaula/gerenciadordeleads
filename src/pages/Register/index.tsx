import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import style from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const setupDatabase = async () => {
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
  }, []);

  const createTable = async (database) => {
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


  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;

    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (db) {
      await db.runAsync(
          'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)',
          [fullName, email, password]
        )
        .then((result: any) => {
          if (result.changes && result.changes > 0) {// Verifica se a inserção foi bem-sucedida
            Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
            console.log('Nome:'+ fullName,'Email:'+ email, 'Senha: '+password);
            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
          } else {
            Alert.alert('Erro', 'Não foi possível registrar o usuário.');
          }
        })
        .catch((error: any) => {// Captura erros específicos de inserção
          if (error.message && error.message.includes('UNIQUE constraint failed: users.email')) {
            Alert.alert('Erro', 'Este email já está cadastrado.');
          } else {
            Alert.alert('Erro', `Erro ao registrar usuário: ${error.message}`);
          }
        });
    } else {
      Alert.alert('Erro', 'Banco de dados não está aberto.');
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


  return (
      <SafeAreaView>
        
        <View style={style.container}>
          <Text style={style.h1}>Registrar</Text>
          <Text style={style.h2}>Crie aqui a sua conta</Text>

          <Text style={style.formLabel}>Nome completo</Text>
          <TextInput
            style={style.input}
            placeholder="Nome Completo"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <Text style={style.formLabel}>Email</Text>
          <TextInput
            style={style.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={style.formLabel}>Senha</Text>
          <TextInput
            style={style.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={style.formLabel}>Confirme a senha</Text>
          <TextInput
            style={style.input}
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <View>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={style.buttonAcess}>Cadastrar</Text>
          </TouchableOpacity>
          </View>
  
        </View>
        </SafeAreaView>
    
   
  );
}

