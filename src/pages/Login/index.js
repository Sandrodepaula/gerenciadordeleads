import { Text, TextInput, View,} from 'react-native';
import { Input, Button } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Login({ navigation }){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[errorEmail, setErrorEmail] = useState(false)
    const[errorPassword, setErrorPassword] = useState(false)

      
    const validationEmail = (text) => {
        setEmail(text);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrorEmail(!regex.test(text));
    };

    const validationPassword = (text) => {
        setPassword(text);
        const regex = /^[A-Za-z\d@$!%*?&]{6,}$/;
        setErrorPassword(!regex.test(text));
      };

    const validation = () =>{
        if (!errorEmail && !errorPassword){
            navigation.navigate('Form')
        }
    }


    return(
        <View style={style.container}>

            <Text style={style.login}>Login</Text>
            
            <Text style={style.formLabel}>Email</Text>
            <TextInput
            style={style.input} 
            placeholder='digite seu e-mail'
            onChangeText={validationEmail}
            keyboardType='email-address'
            />
            {errorEmail && <Text style={{color:'red'}}>Email inválido</Text>}

            <Text style={style.formLabel}>Senha</Text>
            <TextInput
            style={style.input}
            placeholder='digite sua senha' 
            onChangeText={validationPassword}
            secureTextEntry={true}
            />
            {errorPassword && <Text style={{color:'red'}}>Senha inválida</Text>}
           

            <Text style={style.forgot}>Esqueceu a senha?</Text>
           
            <Button style={style.buttonAcess} 
            onPress={() => validation()}
            title="ACESSE"
            disabled={errorEmail || errorPassword}
            />
            

            
            <Text style={style.createdAcount}>Não tem cadastro? Criar conta</Text>
        </View>
      
    );
}