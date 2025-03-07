import {TextInput, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text';
import { DatabaseConnection } from '../../service/database/database-connection';


export default function Register(){
    const db = DatabaseConnection.getConnection();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    
    const register_user = () => {
        console.log(name, email, password);
    
        const validationEmail = (text) => {
            setEmail(text);
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(setEmail === '' || !regex.test(text)){
                setErrorEmail(true);
            }            
        }

        const validationName = () =>{
            if (setName === ''){
                setErrorName(true);
            }
        }

        const validationPassword = (text) => {
            setPassword(text);
            const regex = /^[A-Za-z\d@$!%*?&]{6,}$/;
            setErrorPassword(!regex.test(text));
        };

        const validationConfirmPassword = (text)=>{
            setConfirmPassword(text);
            if (setConfirmPassword == setPassword){
                setErrorConfirmPassword(false);
            }
        };
        
        const validation = () =>{
            console.log('Cadastrou');
        }

        //Banco de dados
        db.transaction(function(tx){
            tx.executeSql(
                'INSERT INTO table_user (user_name, user_password, user_email) VALUES (?,?,?)',
                [name, password, email], 
                (tx, results) => {
                    console.log('Results', results.rowAffected);
                    if (results.rowAffected > 0) {
                        Alert.alert(
                            'Sucesso',
                            'Usuário Registrado com sucesso',
                            [
                                {
                                    text: 'OK', 
                                    onPress: () => navegation.navigate('Leads'),
                                },
                            ],
                            { cancelable:false }
                        );
                    } else alert('Erro ao tentar Registrar o usuário!');
                }
            );
        });
    };
    return(
        <View style={style.container}>
            <Text h1 style={style.h1}>Registrar</Text>
            <Text style={{color:'black', textAlign:'center'}}>Crie aqui sua conta</Text>
            <ScrollView>
                <Text style={style.formLabel}>Nome completo</Text>
                <TextInput
                placeholder='Digite seu nome'
                style={style.input} 
                keyboardType='name-phone-pad'
                onChangeText={(name) => setName(name)}
                />
                {errorName && <Text style={{color:'red'}}>Campo obrigatório</Text>}

                <Text style={style.formLabel}>Email</Text>
                <TextInput
                placeholder='Digite seu email'
                style={style.input} 
                keyboardType='email-address'
                onChangeText={(email) => setEmail(email)}
                />
                {errorEmail && <Text style={{color:'red'}}>Campo obrigatório</Text>}

                <Text style={style.formLabel}>Senha</Text>
                <TextInput
                leftIcon={<Icon name='lock' size={24} color='gray'/>}
                style={style.input}
                placeholder='digite sua senha' 
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                />
                {errorPassword && <Text style={{color:'red'}}>Senha inválida</Text>}

                <Text style={style.formLabel}>Confirme a Senha</Text>
                <TextInput
                leftIcon={<Icon name='lock' size={24} color='gray'/>}
                style={style.input}
                placeholder='digite sua senha' 
                //onChangeText={validationConfirmPassword}
                secureTextEntry={true}
                />
                {errorConfirmPassword && <Text style={{color:'red'}}>Senha inválida</Text>}
               
                <View style={{padding:10}}>
                    <Button
                    title="CADASTRAR"
                    buttonStyle={{backgroundColor: 'rgba(255, 168, 53, 1)',
                    borderRadius: 50,
                    padding:10
                    }}
                    titleStyle={{ fontSize: 20 }}
                    onPress={() => register_user()}
                    disabled={errorName || errorEmail }
                    
                    />
                </View>

            </ScrollView>
            
        </View>
    );
}