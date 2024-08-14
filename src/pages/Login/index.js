import {TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState} from 'react';
import style from './style'


export default function Login(){
    const[email, setEmail] = useState(null)
    const[password, setPassword] = useState(null)

    return(
        <View style={style.container}>
                        
            <Text style={style.login}>Login</Text>

            <Text style={style.formLabel}>Email</Text>
            <TextInput style={style.imput} placeholder='digite seu e-mail'></TextInput>

            <Text style={style.formLabel}>Senha</Text>
            <TextInput style={style.imput} placeholder='digite seu senha' keyboardType='numeric'></TextInput>
            
            <Text style={style.forgot}>Esqueceu a senha?</Text>

            <TouchableOpacity style={style.buttonAcess}>
                <Text style={style.textAcess}>ACESSAR</Text>

            </TouchableOpacity>

            <Text style={style.createdAcount}>Não tem cadastro? Criar conta</Text>
        </View>
      
    );
}

const styles = StyleSheet.create({

});