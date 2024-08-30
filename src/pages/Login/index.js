import { Text, TextInput, View,} from 'react-native';
import { Input, Button } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Login({ navigation }){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState(null)
    const[errorEmail, setErrorEmail] = useState(false)
    const[errorPassword, setErrorPassword] = useState(false)

      
    const validationEmail = (text) => {
        setEmail(text);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrorEmail(!regex.test(text));
    };

    const validationPassword = (text) => {
        setSenha(text);
        const regex = /^[A-Za-z\d@$!%*?&]{6,}$/;
        setErrorPassword(!regex.test(text));
      };

    const validation = () =>{
        if (!errorEmail && !errorPassword){
            navigation({
                routes:[{name: 'Form'}]
            })
        }else{
            console.log('invalido')
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

            <Text style={style.formLabel}>Senha</Text>
            <TextInput
            style={style.input}
            placeholder='digite sua senha' 
            onChangeText={validationPassword}
            secureTextEntry={true}
            />
           

            <Text style={style.forgot}>Esqueceu a senha?</Text>
           
            <Button style={style.buttonAcess} onPress={() => navigation.navigate('Form')} title="ACESSE"/>
            
            <Text style={style.createdAcount}>Não tem cadastro? Criar conta</Text>
        </View>
      
    );
}