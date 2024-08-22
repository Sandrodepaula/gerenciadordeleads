import { Button, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container:{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    login:{
        textAlign:'center',
        paddingBottom:20,
        color:'#FE7235',
        fontWeight:'500',
        fontSize: 36,
    },
    formLabel:{
        color:'#FE7235',
        fontSize:20,
        paddingTop:15,
        paddingBottom:10,
        paddingRight:250,
    },
    imput:{
        height:50,
        width:350,
        fontSize:20,
        placeholderTextColor:'#bbbbbb',
        textAlign:'center',
        backgroundColor:'#ffffff',
        borderRadius:12,
    },
    forgot:{
        textAlign:'right',
        paddingTop:10,
        paddingBottom:20,
    },
    textAcess:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:20,
        padding:10,
    },
    buttonAcess:{
        width:350,
        backgroundColor:'#FFA835',
        borderRadius:50,
    },
    createdAcount:{
        paddingTop:95,
        textAlign:'center',
    }
})

export default style
