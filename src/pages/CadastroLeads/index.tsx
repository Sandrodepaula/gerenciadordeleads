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
import { addLeads, fetchLeads } from '../../service/database/database-connection';



export default function CadastroLeads({ navigation }) {
    const [name, setName] = useState('');
    const [cell, setCell] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [stateUf, setStateUf] = useState('');
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorName, setErrorName] = useState( false);


    
    const validationEmail = (text) => {
        setEmail(text);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(text === '' || !regex.test(text)){
            setErrorEmail(true);
        }
            
    };

    const handleAddLead = async () => {
        try {
            await addLeads(name, email, cell, city, stateUf);
            Alert.alert('Sucesso', 'Lead cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar lead:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o lead.');
        }
        fetchLeads();// Atualiza a lista de usuários após a inserção
    };


    return(
        <View style={style.container}>
            <Text h1 style={style.h1}>Cadastro de leads</Text>
            <ScrollView>
                <Text style={style.formLabel}>Nome completo</Text>
                <TextInput
                style={style.input} 
                keyboardType='name-phone-pad'
                onChangeText={setName}
                autoCapitalize='words'
                />
                {errorName && <Text style={{color:'red'}}>Campo obrigatório</Text>}

                
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
                <Text style={style.formLabel}>Cidade</Text>
                <TextInput
                style={style.input}
                onChangeText={setCity}
                />
                <Text style={style.formLabel}>Estado (UF)</Text>
                <TextInput
                style={style.input}
                onChangeText={setStateUf}
                maxLength={2}
                />
                
                <View style={{padding:10}}>
                    <Button
                    title="CADASTRAR"
                    buttonStyle={{backgroundColor: 'rgba(255, 168, 53, 1)',
                    borderRadius: 50,
                    padding:10
                    }}
                    titleStyle={{ fontSize: 20 }}
                    onPress={() => handleAddLead()}
                    
                    
                    />
                </View>
                <View style={{padding:10}}>
                    <Button
                    title="Leads Cadastrados"
                    buttonStyle={{backgroundColor: 'rgba(0, 0, 0, 1)',
                    borderRadius: 50,
                    padding:10
                    }}
                    titleStyle={{ fontSize: 20 }}               
                    onPress={() => navigation.navigate('Leads')}
                    />
                </View>

            </ScrollView>
            
        </View>
    );
}



