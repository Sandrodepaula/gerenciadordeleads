import {TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import { Text } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style';
import { TextInputMask } from 'react-native-masked-text'
import { cpf } from 'cpf-cnpj-validator'; 

export default function Cpf (){

        const [cpfe, setCpfe] = useState('');
        const [isValid, setIsValid] = useState(false);
      
        const handleCpfChange = (text) => {
            setCpfe(text);
            setIsValid(cpf.isValid(text));
        };
    
    return(
        <View>
            <Text style={style.formLabel}>CPF</Text>
            <TextInputMask 
            style={style.input}
            type={'cpf'}
            value={cpfe}
            placeholder='000.000.000-00'
            onChangeText={handleCpfChange}
            />
            <Text style ={{color: 'red'}}>{isValid ? 'cpf valido' : 'cpf invalido'}</Text>
        </View>
    );
}