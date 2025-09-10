
import {TextInput, View, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Alert} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState, useEffect, use} from 'react';
import style from './style';
import CadastroLeads from '../CadastroLeads';
import { useFocusEffect } from '@react-navigation/native';
import { fetchLeads, deleteLead } from '../../service/database/database-connection';

export default function Leads({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [city, setCity] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [leads, setLeads] = useState([]);
  const [db, setDb] = useState(null);

  const loadLeads = async () => {
    const loadLeads = await fetchLeads();
    setLeads(loadLeads);

  };


  const delete_Lead = async (id: number) => {
    await deleteLead(id);
    await loadLeads();
  };

  useFocusEffect(// Recarrega a lista de usuários quando a tela ganha foco
    React.useCallback(() => {
      loadLeads();
    }, [])
  );


  const renderItem = ({ item }) => (
    <View style={style.usuariosContainer} >
      <View> 
        <Text style={style.leadItem}>Nome: {item.name}</Text>
        <Text style={style.leadItem}>Email: {item.email}</Text>
        <Text style={style.leadItem}>Celular: {item.cell}</Text>
      </View>
      <Button title="Deletar"
        buttonStyle={style.buttonDelete}
        onPress={() => delete_Lead(item.id)}
      />
      <Button title="Editar"
        buttonStyle={style.buttonEdit}
      />
    </View>
  );

  

  return (
    <SafeAreaView style={style.container}>
      <Text>Leads</Text>
            
            <FlatList
              data={leads}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={<Text style={style.leadItem}>Nenhum usuário cadastrado.</Text>}
              contentContainerStyle={leads.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
            
            />
            <View>
              <Button
                title={'Cadastrar + '}
                color={'#000000ff'}
                buttonStyle={style.buttonRegister}
                onPress = {() => navigation.navigate('CadastroLeads')}
              />
            </View>

    </SafeAreaView>
  );
};
