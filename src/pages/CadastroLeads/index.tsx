import {TextInput, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text';
import Cep from './Cep';
import Cpf from './Cpf';
import DateCalendar from './DateCalendar';
import { Calendar } from 'react-native-calendars';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('leads.db');

export default function Form(){
    const [nome, setName] = useState('');
    const [cell, setCell] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorName, setErrorName] = useState(false);

        useEffect(() => {
            // Verificar se 'db' está definido antes de tentar usá-lo
            if (db) {
            db.execAsync(
                `PRAGMA journal_mode = WAL;
                PRAGMA foreign_keys = ON;
                CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, cell NUMBER, email TEXT UNIQUE);`
            ).catch((error: any) => {
                console.error("Erro ao inicializar o banco de dados:", error);
            });
            } else {
            console.error("Erro: O objeto 'db' não foi inicializado corretamente.");
            }
        }, []);
    
    const validationEmail = (text) => {
        setEmail(text);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(text === '' || !regex.test(text)){
            setErrorEmail(true);
        }
            
    };

    const validationName = () =>{
        if (nome === ''){
            setErrorName(true)
        }
    }

    
    const validation = () =>{
        console.log('Cadastrou');
    }

    if (db) {
          db
            .runAsync(
              'INSERT INTO leads (name, cell, email) VALUES (?, ?, ?)',
              [nome, cell, email]
            )
            .then((result: any) => {
              if (result.changes && result.changes > 0) {// Verifica se a inserção foi bem-sucedida
                Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
                setName('');
                setEmail('');
                setCell('');
              } else {
                Alert.alert('Erro', 'Não foi possível registrar o usuário.');
              }
            })
            .catch((error: any) => {// Captura erros específicos de inserção
              if (error.message && error.message.includes('UNIQUE constraint failed: leads.email')) {
                Alert.alert('Erro', 'Este email já está cadastrado.');
              } else {
                Alert.alert('Erro', `Erro ao registrar usuário: ${error.message}`);
              }
            });
        } else {
          Alert.alert('Erro', 'Banco de dados não está aberto.');
        }
      

    return(
        <View style={style.container}>
            <Text h1 style={style.h1}>Cadastro de leads</Text>
            <ScrollView>
                <Text style={style.formLabel}>Nome completo</Text>
                <TextInput
                style={style.input} 
                keyboardType='name-phone-pad'
                onChangeText={validationName}
                />
                {errorName && <Text style={{color:'red'}}>Campo obrigatório</Text>}

                <Text style={style.formLabel}>Sexo</Text>
                <TouchableOpacity style={style.select}>
                    <Text>Selecione</Text>
                    <Icon name='mail' size={20}/>
                </TouchableOpacity>
                
                <Text style={style.formLabel} >Data de Nascimento</Text>
                <TextInputMask
                style={style.inputDate}
                type={'datetime'}
                options={{
                    format:'DD/MM/YYYY'
                }}
                value={date}
                onChangeText={text => setDate(text)}
                
                />
                <Calendar/>
                <Text style={style.formLabel}>E-mail</Text>
                <TextInput
                style={style.input} 
                placeholder='Digite seu e-mail'
                keyboardType='email-address'
                onChangeText={validationEmail}
                
                />
                <Text style={style.formLabel}>Telefone</Text>
                <TextInputMask
                style={style.input}
                type={'cel-phone'}
                options={{
                    maskType:'BRL',
                    withDDD: true,
                    dddMask:'(99) '
                }}
                value={cell}
                onChangeText={text => setCell(text)}
                placeholder='(00) 9 0000-0000'
                />
                
                <Cpf/>
                <Cep/>
                <View style={{padding:10}}>
                    <Button
                    title="CADASTRAR"
                    buttonStyle={{backgroundColor: 'rgba(255, 168, 53, 1)',
                    borderRadius: 50,
                    padding:10
                    }}
                    titleStyle={{ fontSize: 20 }}
                    onPress={() => validation()}
                    disabled={errorName || errorEmail }
                    
                    />
                </View>

            </ScrollView>
            
        </View>
    );
}



