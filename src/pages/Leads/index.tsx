
import {TextInput, View, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Alert} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState, useEffect, use} from 'react';
import style from './style';
import CadastroLeads from '../CadastroLeads';
import { useFocusEffect } from '@react-navigation/native';
import { fetchLeads, addLeads, deleteLead } from '../../service/database/database-connection';

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
    <View style={style.usuariosContainer}>
      <View style={style.leadItem}> 
        <Text style={style.leadItem}>Nome: {item.name}</Text>
        <Text style={style.leadItem}>Email: {item.email}</Text>
        <Text style={style.leadItem}>Celular: {item.cell}</Text>
        <Text style={style.leadItem}>Cidade: {item.city}</Text>
        <Text style={style.leadItem}>Estado: {item.stateUf}</Text>
      </View>
      <Button style={style.buttonDelete} title="Deletar"
        onPress={() => delete_Lead(item.id)}
      />
    </View>
  );

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Lista de Leads</Text>
            <ScrollView>
                    
            <FlatList style={style.usuariosContainer}
              data={leads}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={<Text style={style.leadItem}>Nenhum usuário cadastrado.</Text>}
              contentContainerStyle={leads.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
       
        />
      </View>
    </SafeAreaView>
  );
};
