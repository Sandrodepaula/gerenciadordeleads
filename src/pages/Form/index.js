import {TextInput, View, ScrollView} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style'


export default function Form(){
    return(
        <View style={style.container}>
            <Text h1>Cadastro de leads</Text>
            <ScrollView>
                <Text style={style.formLabel}>Nome completo</Text>
                <TextInput
                style={style.input} 
                placeholder='digite seu nome completo'
                keyboardType='name-phone-pad'
                />
                <Text style={style.formLabel}>Sexo</Text>
                <Input
                style={{borderRadius:12, backgroundColor:'#ffffff', width:150}} 
                placeholder='Selecione'
                keyboardType='default'
                />
                <Text style={style.formLabel}>Data de Nascimento</Text>
                <Input
                style={style.input} 
                placeholder=''
                keyboardType='email-address'
                />
                <Text style={style.formLabel}>E-mail</Text>
                <TextInput
                style={style.input} 
                placeholder='Digite seu e-mail'
                keyboardType='email-address'
                />
                <Text style={style.formLabel}>Telefone</Text>
                <TextInput
                style={style.input} 
                placeholder='Digite seu telefone'
                keyboardType='phone-pad'
                />
                <Text style={style.formLabel}>CPF</Text>
                <TextInput
                style={style.input} 
                placeholder=''
                keyboardType='numeric'
                />
                <Text style={style.formLabel}>CEP</Text>
                <TextInput
                style={style.input} 
                placeholder=''
                keyboardType='numeric'
                />
                <Text style={style.formLabel}>Estado</Text>
                <TextInput
                style={style.input} 
                placeholder='digite seu nome completo'
                keyboardType='email-address'
                />
                <Text style={style.formLabel}>Logradouro</Text>
                <TextInput
                style={style.input} 
                placeholder=''
                keyboardType=''
                />
            </ScrollView>
        </View>
    );
}
