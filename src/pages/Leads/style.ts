import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        padding:15,
        backgroundColor:'rgba(231, 231, 231, 0.51)',
        
    },


    buttonEdit:{
        width:80,
        backgroundColor:'#FFA835',
        borderRadius:10,
        marginTop:10,
        fontSize:12,
        
    },

    buttonAcess:{
        width:350,
        backgroundColor:'#FFA835',
        borderRadius:50,
    },

    buttonDelete:{
        backgroundColor: 'rgba(210, 36, 36, 1)',
        borderRadius: 10,
        width:80,
        marginTop:10,
        fontSize:12,
        
    },

    buttonRegister:{
        width:150,
        backgroundColor:'#ff7c09c9',
        borderRadius:50,
        marginTop:20, 
        marginBottom:20,
        fontSize:15,
        shadowColor: '#0c0c0c6d',
        shadowOpacity: 0.1,
        elevation: 8,
        
    },

    leadItem: {
        padding: 10,
        fontSize: 15,

    },

    usuariosContainer: {
        flex: 1,
        height: '90%',
        width: '100%',
        backgroundColor: '#ffffffff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#fe7135ff',
        shadowOpacity: 0.1,
        elevation: 8,
    },

  
})

export default style