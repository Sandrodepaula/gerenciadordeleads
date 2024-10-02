import {TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text'
import Cep from './Cep'

export default function Form(){
    const [cell, setCell] = useState('');
    const [cpf, setCpf] = useState('');
    const [date, setDate] = useState('');
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [logradouro, setLogradouro] = useState('');



    return(
        <View style={style.container}>
            <Text h1 style={style.h1}>Cadastro de leads</Text>
            <ScrollView>
                <Text style={style.formLabel}>Nome completo</Text>
                <TextInput
                style={style.input} 
                keyboardType='name-phone-pad'
                />
                <Text style={style.formLabel}>Sexo</Text>
                <TouchableOpacity style={style.select}>
                    <Text>Selecione</Text>
                    <Icon name='mail' size={20}/>
                </TouchableOpacity>
                
                <Text style={style.formLabel}>Data de Nascimento</Text>
                <TextInputMask
                style={style.inputDate}
                type={'datetime'}
                options={{
                    format:'DD/MM/YYYY'
                }}
                value={date}
                onChangeText={text => setDate(text)}
                />
                <Text style={style.formLabel}>E-mail</Text>
                <TextInput
                style={style.input} 
                placeholder='Digite seu e-mail'
                keyboardType='email-address'
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
                placeholder='(99) 99999-9999'
                />
                <Text style={style.formLabel}>CPF</Text>
                <TextInputMask 
                style={style.input}
                type={'cpf'}
                value={cpf}
                onChange={text => setCpf(text)}
                placeholder='999.999.999-99'
                />
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
                    
                    />
                </View>

            </ScrollView>
            
        </View>
    );
}



