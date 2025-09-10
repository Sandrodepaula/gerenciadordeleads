import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import style from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { addUser } from '../../service/database/database-connection';

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [db, setDb] = useState(null);



  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await addUser(fullName, email, password);
      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o usuário.');
    }
  };

  return (
      <SafeAreaView>
        
        <View style={style.container}>
          <Text style={style.h1}>Registrar</Text>
          <Text style={style.h2}>Crie aqui a sua conta</Text>

          <Text style={style.formLabel}>Nome completo</Text>
          <TextInput
            style={style.input}
            placeholder="Nome Completo"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <Text style={style.formLabel}>Email</Text>
          <TextInput
            style={style.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={style.formLabel}>Senha</Text>
          <TextInput
            style={style.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={style.formLabel}>Confirme a senha</Text>
          <TextInput
            style={style.input}
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <View style={{alignItems:'center', paddingTop:20}}>
          <Button
          title={"CADASTRAR"}
          buttonStyle={style.buttonAcess}
          onPress={handleRegister}
          />
          </View>
  
        </View>
        </SafeAreaView>
    
   
  );
};
