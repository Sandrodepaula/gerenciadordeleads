
import {ImageBackground, Image, StyleSheet, View } from 'react-native';
import Login from './src/pages/Login';

export default function App() {
  return (
    <View style={style.container}>
      <ImageBackground source={require('./src/assests/background-image-500.jpg')} style={style.image}>

        <View style={style.container}>
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
  
})

