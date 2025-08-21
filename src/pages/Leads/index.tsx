
import {TextInput, View, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Alert} from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import style from './style';
import CadastroLeads from '../CadastroLeads';
import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('leads.db');

export default function Leads({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [city, setCity] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [leads, setLeads] = useState<any[]>([]);

  /*createdTableLeads = () => {
    db.transaction((tx)=> {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS leads(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(30), cell VARCHAR(15), city VARCHAR(30), state VARCHAR(2))",
        [],
        ()=>{
          console.log("Tabela criada com sucesso");
        },
        (_, error)=> {
          console.log("Erro ao criar a tabela ",error);
          return false;
        }
      );
    });
  }*/

  /*registerOrEditLeads = () => {
    const {name, email, cell, city, state, editId} = this.state;
    if(name === ''|| email === ''|| cell === ''|| city === ''|| state === ''){
      alert('O campo nome é obrigatório');
      return;
    }

    if(editId === null){
      //Inserção de novo registro
      db.transaction ((tx) => {
        tx.executeSql(
          'INSERT INTO leads (name, email, cell, city, state) VALUES (?,?,?,?,?)',
          [name, email, cell, city, state],
          (_, result) => {
            Alert.alert('Sucesso', 'Lead cadastrado com sucesso');
            this.setState({name: '', email: '', cell: '', city: '', state: ''});
            this.carregarLeads();
          },
          (_, error) => {
            console.log('Erro ao cadastrar o lead', error);
            Alert.alert('Erro', 'Erro ao cadastrar o lead');
            return false;
          }
        );
      });
    } else{
      //Atualização de registro existente
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE leads SET name = ?, email = ?, cell = ?, city = ?, state = ? WHERE id = ?',
          [name, email, cell, city, state, editId],
          (_, result) => {
            Alert.alert('Sucesso', 'Lead atualizado com sucesso');
            this.setState({name: '', email: '', cell: '', city: '', state: '', editId: null});
            this.carregarLeads();
          },
          (_, error) => {
            console.log('Erro ao atualizar o lead', error);
            Alert.alert('Erro', 'Erro ao atualizar o lead');
            return false;
          }
        );
      });
    }
  };*/

  /*deleteLeads = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM leads WHERE id = ?',
        [id],
        (_, result) => {
          Alert.alert('Sucesso', 'Lead excluído com sucesso');
          this.carregarLeads();
        },
        (_, error) => {
          console.log('Erro ao excluir o lead', error);
          Alert.alert('Erro', 'Erro ao excluir o lead');
          return false;
        }
      );
    });
  };*/
  /*carregarLeads = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM leads',
        [],
        (_, { rows }) => {
          this.setState({ leads: rows._array });
        },
        (_, error) => {
          console.log('Erro ao carregar os leads', error);
          return false;
        }
      );
    });
  };*/

  const startEdit = (lead: any) => {
    setName(lead.name);
    setEmail(lead.email);
    setCell(lead.cell);
    setCity(lead.city);
    setStateUf(lead.state);
    setEditId(lead.id);
  };

  useEffect(() => {
    createdTableLeads();
    carregarLeads();
  }, []);

  // You need to rewrite createdTableLeads and carregarLeads as functions using hooks
  const createdTableLeads = async () => {
    try {
      await db.runAsync(
        "CREATE TABLE IF NOT EXISTS leads(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(30), cell VARCHAR(15), city VARCHAR(30), state VARCHAR(2))"
      );
      console.log("Tabela criada com sucesso");
    } catch (error) {
      console.log("Erro ao criar a tabela ", error);
    }
  };

  const carregarLeads = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM leads');
      setLeads(result);
    } catch (error) {
      console.log('Erro ao carregar os leads', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Lista de Leads</Text>
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={style.View}>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.cell}</Text>
              <Text>{item.city}</Text>
              <Text>{item.state}</Text>
              <View style={style.buttonEdit}>
                <Button
                  title="Editar"
                  onPress={() => startEdit(item)}
                />
              </View>
            </View>
          )}
        />
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
