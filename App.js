
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

/*const style = StyleSheet.create({
  container:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    height:800,
    width:500,
    resizeMode:'cover',
    justifyContent:'center',
    
  },  
  
})*/

/*<View style={style.container}>
<ImageBackground source={require('./src/assests/background-image-500.jpg')} style={style.image}>

<View style={style.container}>
  <Image 
  source={require('./src/assests/logo-icon-200.png')} 
  style={style.logo}/>
  <Login/>

</View>

</ImageBackground>
</View>*/

