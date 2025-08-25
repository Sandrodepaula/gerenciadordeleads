
import {TextInput, View, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Alert} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import style from './style';
import CadastroLeads from '../CadastroLeads';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';


export default function Leads({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [city, setCity] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [leads, setLeads] = useState([]);
  const [db, setDb] = useState(null);

  const route = useRoute();
  const { users } = route.params || {};// Recebe os usuários como parâmetro de navegação

  const renderItem = ({ item }) => (
    <View style={style.leadItem}> 
      <Text style={style.leadItem}>Nome: {item.name}</Text>
      <Text style={style.leadItem}>Email: {item.email}</Text>
    </View>
  );

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Lista de Leads</Text>
            <ScrollView>
            <Text>Usuarios: </Text>        
            <FlatList style={style.usuariosContainer}
              data={users}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={<Text style={style.leadItem}>Nenhum usuário cadastrado.</Text>}
              horizontal={true}
            />
            </ScrollView>
      </View>
      <View style={style.buttonAcess}>
        <Button
          title={'Cadastrar + '}
          buttonStyle={{
            backgroundColor: 'rgb(182, 37, 37)',
            borderRadius: 50,
          }}
          onPress={() => CadastroLeads(navigation)}
        />
      </View>
    </SafeAreaView>
  );
};
