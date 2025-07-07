
import Login from './src/pages/Login/index';
import Register from './src/pages/Register/index';
import Leads from './src/pages/Leads';
import CadastroLead from './src/pages/CadastroLeads/index';

import {ImageBackground, Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{title:'', headerTransparent:true, headerShown: false}} name="Login" component={Login} />
          <Stack.Screen name="CadastroLead" component={CadastroLead} />
          <Stack.Screen name = "Register" component = {Register} />
          <Stack.Screen name="Leads" component={Leads} />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}