import {TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text'

export default function Cep(){
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState(null);
    const [logradouro, setLogradouro] = useState('');
    const [endereco, setEndereco] = useState('');
    
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            setEndereco(data);
            
          } catch (error) {
            
        }};   
        fetchData();
      }, [cep]);
      
    
    
    return(
        <View>
            <Text style={style.formLabel}>CEP</Text>
            <TextInput
            style={style.input}
            value={cep} 
            onChangeText={(text)=> setCep(text)}
            placeholder='Cep'
            keyboardType='numeric'
            />
                
            <Text style={style.formLabel}>Estado</Text>
            <TextInput
            style={style.input} 
            placeholder=' '
            value={estado || endereco.estado}   
            onChangeText={(text)=> setEstado(text)}
            keyboardType='name-phone-pad'
            />

            <Text style={style.formLabel}>Logradouro</Text>
            <TextInput
            style={style.input}
            value={logradouro || endereco.logradouro} 
            onChangeText={(text)=> setLogradouro(text)}
            keyboardType='name-phone-pad'
            />
            
        </View>
    );
}

