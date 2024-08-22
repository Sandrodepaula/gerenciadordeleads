import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, {useState} from 'react';
import style from './style'


export default function Login(){
    const[email, setEmail] = useState(null)
    const[password, setPassword] = useState(null)
    const[errorEmail, setErrorEmail] = useState(null)
    const[errorPassword, setErrorPassword] = useState(null)

    const validar = () => {      
        let error = false
        setErrorEmail(null)
        setErrorPassword(null)
        if (email == null){
            setErrorEmail('Prencha corretamente')
            error = true
        }
        return !error
   
    }

    return(
        <View style={style.container}>
                        
            <Text style={style.login}>Login</Text>

            <Text style={style.formLabel}>Email</Text>
            <TextInput 
            style={style.imput} 
            placeholder='digite seu e-mail' 
            onChangeText={value=> setErrorEmail(value)} 
            keyboardType='email-address'
            //errorMessege={errorEmail}
            />

            <Text style={style.formLabel}>Senha</Text>
            <TextInput 
            style={style.imput} 
            placeholder='digite seu senha' 
            onChangeText={value=> {setPassword(value);setErrorPassword(null)}} 
            keyboardType='numeric'
            //errorMessege={errorPassword}
            />
            
            <Text style={style.forgot}>Esqueceu a senha?</Text>

            <Button style={style.buttonAcess} onPress={() => {validar() }} title="ACESSE"/>

            <Text style={style.createdAcount}>Não tem cadastro? Criar conta</Text>
        </View>
      
    );
}