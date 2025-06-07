import React, { useState, useEffect } from 'react';
import { TextInput, View, ScrollView, Alert } from 'react-native';
import { Button, Text } from '@rneui/themed';
import style from './style';
import * as SQLite from 'expo-sqlite';

SQLite.enablePromise(true);

//const db = await SQLite.openDatabaseAsync('user.db');
const DB_NAME = 'user.db';
const DB_LOCATION = 'default';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const openDatabase = async () => {
            try {
                setIsLoading(true);
                console.log('Abrindo banco de dados...');
                const database = await SQLite.openDatabase({
                    DB_NAME, DB_LOCATION,
                });
                setDb(database);
                console.log('Banco de dados aberto com sucesso');
            }catch (error) {
                console.error('Erro ao abrir o banco de dados:', error);
                Alert.alert('Erro', 'Não foi possível abrir o banco de dados');
            } finally {
                setIsLoading(false);
            }

        };

        async function criarTabelaPessoas() {
        try {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                );`
            );
            console.log('Tabela de usuários criada com sucesso');
        } catch (error) {
            console.error('Erro ao criar tabela de usuários:', error);
            Alert.alert('Erro', 'Não foi possível criar a tabela de usuários');
        }
        
    };
    criarTabelaPessoas(); 
    }, []);
    

    function cadastrarOuEditarUsuario() {

        if (name === '' || email === '' || password === '') {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
            }
        if (editingId === null){
            // Cadastrar novo lead
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
                    [name, email, password],
                    (_, result) => {
                        Alert.alert('Sucesso', 'usuário cadastrado com sucesso');
                        setName('');
                        setEmail('');
                        setPassword('');
                        setEditingId(null);
                        // Se quiser listar usuários, chame aqui
                    },
                    (_, error) => {
                        console.error('Erro ao cadastrar usuário:', error);
                        Alert.alert('Erro', 'Não foi possível cadastrar o usuário');
                        return false;
                    }
                );
            });
        } else{
            // Atualizar lead existente
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?',
                    [name, email, password, editingId],
                    (_, result) => {
                        Alert.alert('Sucesso', 'usuário atualizado com sucesso');
                        setName('');
                        setEmail('');
                        setPassword('');
                        setEditingId(null);
                        // Se quiser listar usuários, chame aqui
                    },
                    (_, error) => {
                        console.error('Erro ao atualizar usuário:', error);
                        Alert.alert('Erro', 'Não foi possível atualizar o usuário');
                        return false;
                    }
                );
            });
        }
    }
  
        
    return (
        <ScrollView> 
            <View style={style.container}>
                <Text h1 style={style.h1}>Registrar</Text>
                <Text style={{ color: 'black', textAlign: 'center' }}>Crie aqui sua conta</Text>
                
                    <Text style={style.formLabel}>Nome completo</Text>
                    <TextInput
                        placeholder='Digite seu nome'
                        style={style.input}
                        keyboardType='name-phone-pad'
                        value={name}
                        onChangeText={setName}
                    />
                    
                    <Text style={style.formLabel}>Email</Text>
                    <TextInput
                        placeholder='Digite seu email'
                        style={style.input}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail} 
                    />
                    
                    <Text style={style.formLabel}>Senha</Text>
                    <TextInput
                        style={style.input}
                        placeholder='digite sua senha'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={false}
                    />
                    
                    <Text style={style.formLabel}>Confirme a Senha</Text>
                    <TextInput
                        style={style.input}
                        placeholder='digite sua senha'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={false}
                    />
                    
                    <View style={{ padding: 10 }}>
                        <Button
                            title="CADASTRAR"
                            buttonStyle={{
                                backgroundColor: 'rgba(255, 168, 53, 1)',
                                borderRadius: 50,
                                padding: 10
                            }}
                            titleStyle={{ fontSize: 20 }}
                            onPress={cadastrarOuEditarUsuario}
                            disabled={!name || !email || !password}
                            
                        />
                    </View>
                
            </View>
        </ScrollView>
    );
    
}