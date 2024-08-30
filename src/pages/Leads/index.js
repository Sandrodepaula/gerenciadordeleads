import { Text, TextInput, View,} from 'react-native';
import { Input, Button } from '@rneui/themed';
import React, {useState} from 'react';
import style from './style'


export default function Leads(navigation){

    const sair = () => {
        navigation.reset({
            index: 0,
            routes: [{name: "Login"}]
        })
    }


    return(

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Tela de Leads</Text>
        </View>
    );
}