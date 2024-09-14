
import Login from './src/pages/Login';
import Form from './src/pages/Form'
import {ImageBackground, Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{title:'', headerTransparent:true, headerShown: false}} name="Login" component={Login} />
          <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}