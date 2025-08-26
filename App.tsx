
import Login from './src/pages/Login/index';
import Register from './src/pages/Register/index';
import Leads from './src/pages/Leads';
import CadastroLeads from './src/pages/CadastroLeads';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Leads" component = {Leads} />          
          <Stack.Screen name="CadastroLeads" component={CadastroLeads} />

          <Stack.Screen options={{title:'', headerTransparent:true, headerShown: false}} name="Login" component={Login} />
          <Stack.Screen name = "Register" component = {Register} />
         
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}