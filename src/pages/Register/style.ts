import { FlatList, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    },
    h1:{
        color:'#FE7235',
        textAlign:'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    h2:{
        color:'#000000',
        textAlign:'center',
        fontSize: 20,
    },
    formLabel:{
        color:'#FE7235',
        fontSize:18,
        paddingTop:15,
        paddingBottom:10,
        textAlign:'left',
    },
  
    input:{
        height:50,
        width:317,
        fontSize:14,
        textAlign:'center',
        backgroundColor:'#ffffff',
        borderRadius:12,
    },
   
    buttonAcess:{
        width:315,
        backgroundColor:'#FFA835',
        borderRadius:50,
        padding:10,
    },

    leadItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ee7913ff',
    },

    usuariosContainer: {
        flex: 1,
        height: 200,
        width: '100%',
        backgroundColor: '#ffcacaff',
        paddingTop: 20,
    },
   
})

export default style