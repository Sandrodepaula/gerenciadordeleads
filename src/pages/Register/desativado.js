
import React, { useState, useEffect } from 'react';
import { TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import style from './style';
import * as SQlite from 'react-native-sqlite-storage';



export default function Desativado() {
    const DB_NAME = 'app.db';
    const DB_LOCATION = 'default';
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const [db, setDb] = useState(null);

    useEffect(() => {// Efeito para abrir o banco de dados e criar a tabela de usuários
        const openDatabase = async () => {
            try {
                const database = await SQlite.openDatabase({
                    name: DB_NAME,
                    location: DB_LOCATION,
                });
                setDb(database);
                await createTable(database);
            } catch (error) {
                console.error('Error opening database:', error);
                Alert.alert('Erro', 'Não foi possível abrir o banco de dados');
            }
        };
        openDatabase(); // Chama a função para abrir o banco de dados

        // Limpa o banco de dados ao desmontar o componente
        return () => {
            if (db) {
                db.close()
                    .then(() => {
                        console.log('Database closed');
                    })
                    .catch(error => {
                        console.error('Error closing database:', error);
                    });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //Função para criar a tabela de usuários
    const createTable = async (database) => {
        try {
            await database.executeSql(
                `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    password TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE);`
            );
            console.log('Table "users" created successfully');
        } catch (error) {
            console.error('Error creating table:', error);
            Alert.alert('Erro', 'Não foi possível criar a tabela de usuários');
        }
    };
    //Função para registrar o usuário
    const handleRegister = async () => {
        // Verifica se os campos estão preenchidos
        setErrorName(!name);
        setErrorEmail(!email);
        setErrorPassword(!password || password.length < 6);
        setErrorConfirmPassword(password !== confirmPassword);

        if (!name || !email || !password || password.length < 6 || password !== confirmPassword) {
            return;
        }

        if (!db) {
            Alert.alert('Erro', 'Banco de dados não está aberto');
            return;
        }
        
        
        try {
            db.executeSql(
                'INSERT INTO users (name, password, email) VALUES (?, ?, ?)',
                [name, password, email]
            );
            Alert.alert('Sucesso', 'Usuário adicionado com sucesso');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            Alert.alert('Erro', 'Não foi possível adicionar o usuário');
        }
    };

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
                        onChangeText={(text) => setName(text)}
                    />
                    {errorName && <Text style={{ color: 'red' }}>Campo obrigatório</Text>}

                    <Text style={style.formLabel}>Email</Text>
                    <TextInput
                        placeholder='Digite seu email'
                        style={style.input}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    {errorEmail && <Text style={{ color: 'red' }}>Campo obrigatório</Text>}

                    <Text style={style.formLabel}>Senha</Text>
                    <TextInput
                        style={style.input}
                        placeholder='digite sua senha'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                    {errorPassword && <Text style={{ color: 'red' }}>Senha inválida</Text>}

                    <Text style={style.formLabel}>Confirme a Senha</Text>
                    <TextInput
                        style={style.input}
                        placeholder='digite sua senha'
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={true}
                    />
                    {errorConfirmPassword && <Text style={{ color: 'red' }}>Senha inválida</Text>}

                    <View style={{ padding: 10 }}>
                        <Button
                            title="CADASTRAR"
                            buttonStyle={{
                                backgroundColor: 'rgba(255, 168, 53, 1)',
                                borderRadius: 50,
                                padding: 10
                            }}
                            titleStyle={{ fontSize: 20 }}
                            onPress={handleRegister}
                            disabled={errorName || errorEmail}
                        />
                    </View>
                
            </View>
        </ScrollView>
    );
}