
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Form from './src/pages/Form';
import Leads from './src/pages/Leads';

import {ImageBackground, Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DatabaseConnection } from './src/service/database/database-connection';

const db = DatabaseConnection.getConnection();
const Stack = createNativeStackNavigator();

export default function App() {
  return (  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{title:'', headerTransparent:true, headerShown: false}} name="Login" component={Login} />
          <Stack.Screen name="Leads" component={Leads} />
          <Stack.Screen name = "Register" component = {Register} />
          <Stack.Screen name="Form" component={Form} />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}