import {TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('users.db');

export default function Leads(){
    const [lead, setLead] = useState('');






    const register = () =>{
        navigation.navigate('Register')
    }

    return(
        <ScrollView>
            <View style={style.container}>
                <View style={style.View}>
                <Text>Lead:</Text>
                <Text>E-mail:</Text>
                <Text>Celular:</Text>
                <Text>Status:</Text>
                <Text>Cidade:</Text>
                <Text>Estado:</Text>

                <Button
                title={'Editar'}               
                />
            </View>
            
                
            </View>

            <View style={style.buttonAcess}>
                <Button
                title={'Cadastrar + '}
                buttonStyle={{backgroundColor: 'rgb(182, 37, 37)',
                
                borderRadius: 50,            
                }}
                
                />
            </View>

        </ScrollView>
        

    );
}