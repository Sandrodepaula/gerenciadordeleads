
import {ImageBackground, Image, StyleSheet, View } from 'react-native';
import Login from './src/pages/Login';

export default function App() {
  return (
    <View style={style.container}>
      <ImageBackground source={require('./src/assests/background-image-500.jpg')} resizeMode='cover'style={style.image}>

        <View >
    
          <Image 
          source={require('./src/assests/logo-icon-200.png')} 
          style={style.logo}/>
          <Login/>

        </View>

      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flex:1,
  },
  image:{
    flex:1,
    justifyContent:'center',
  },  
  logo:{
    
  },
})

