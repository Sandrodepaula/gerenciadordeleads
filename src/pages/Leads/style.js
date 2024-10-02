import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
    },
    h1:{
        color:'#FE7235',
        textAlign:'center'
    },
    formLabel:{
        color:'rgba(0, 0, 0, 1);',
        fontSize:14,
        paddingTop:15,
        paddingBottom:10,
        paddingRight:250,
        fontWeight:'bold',
        
    },
  
    input:{
        height:50,
        width:350,
        fontSize:14,
        placeholderTextColor:'#bbbbbb',
        textAlign:'center',
        backgroundColor:'#ffffff',
        borderRadius:12,
    },
    inputDate:{
        padding:10,
        height:50,
        width:'40%',
        fontSize:14,
        placeholderTextColor:'#bbb',
        backgroundColor:'#ffffff',
        borderRadius:12,
    },
    select:{
        height:50,
        width:'40%',
        fontSize:14,
        padding:10,
        placeholderTextColor:'#bbb',
        backgroundColor:'#ffffff',
        borderRadius:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
  
    buttonAcess:{
        width:350,
        backgroundColor:'#FFA835',
        borderRadius:50,
    },
   
})

export default style