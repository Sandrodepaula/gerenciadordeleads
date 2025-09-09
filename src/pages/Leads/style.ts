import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        backgroundColor:'rgba(255, 255, 255, 0.72)',
        
    },


    buttonEdit:{
        width:100,
        backgroundColor:'#FFA835',
        borderRadius:50,
        marginTop:10,
        marginBottom:10,
    },

    buttonAcess:{
        width:350,
        backgroundColor:'#FFA835',
        borderRadius:50,
    },

    buttonDelete:{
        backgroundColor: 'rgba(142, 107, 107, 1)',
        borderRadius: 50,
        width:50,
        marginTop:10,
        
    },

    leadItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ee7913ff',
    },

    usuariosContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#ffcacaff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },

  
})

export default style