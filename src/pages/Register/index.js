import {TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text';


export default function Register(){
    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    
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
                onChangeText={validationName}
                />
                {errorName && <Text style={{color:'red'}}>Campo obrigatório</Text>}

                <Text style={style.formLabel}>Email</Text>
                <TextInput
                placeholder='Digite seu email'
                style={style.input} 
                keyboardType='email-address'
                onChangeText={validationEmail}
                />
                {errorEmail && <Text style={{color:'red'}}>Campo obrigatório</Text>}

                <Text style={style.formLabel}>Senha</Text>
                <TextInput
                leftIcon={<Icon name='lock' size={24} color='gray'/>}
                style={style.input}
                placeholder='digite sua senha' 
                onChangeText={validationPassword}
                secureTextEntry={true}
                />
                {errorPassword && <Text style={{color:'red'}}>Senha inválida</Text>}

                <Text style={style.formLabel}>Confirme a Senha</Text>
                <TextInput
                leftIcon={<Icon name='lock' size={24} color='gray'/>}
                style={style.input}
                placeholder='digite sua senha' 
                onChangeText={validationConfirmPassword}
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
                    onPress={() => validation()}
                    disabled={errorName || errorEmail }
                    
                    />
                </View>

            </ScrollView>
            
        </View>
    );
}