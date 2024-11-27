import {TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text';
import Cep from './Cep';
import Cpf from './Cpf';
import DateCalendar from './DateCalendar';
import { Calendar } from 'react-native-calendars';

export default function Form(){
    const [nome, setName] = useState('');
    const [cell, setCell] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorName, setErrorName] = useState(false);
    
    const validationEmail = (text) => {
        setEmail(text);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(setEmail === '' || !regex.test(text)){
            setErrorEmail(true);
        }
            
    };

    const validationName = () =>{
        if (setName === ''){
            setErrorName(true)
        }
    }

    
    const validation = () =>{
        console.log('Cadastrou');
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



