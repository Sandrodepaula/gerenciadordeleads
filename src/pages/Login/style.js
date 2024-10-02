import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:15
        
    },
    logo:{
        alignItems:'center',
        padding:65,
    },
    login:{
        textAlign:'center',
        paddingBottom:20,
        color:'#FE7235',
        fontWeight:'500',
        fontSize: 36,
    },
    formLabel:{
        textAlign:'left',
        color:'#FE7235',
        fontSize:20,
        paddingTop:15,
        paddingBottom:10,
        paddingLeft:15
    },
    input:{
        height:50,
        width:'100%',
        fontSize:20,
        textAlign:'left',
        backgroundColor:'white',
        borderRadius:12,
        padding:10,
        shadowColor:'#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 9,
        elevation: 6,
       
    },
    forgot:{
        textAlign:'right',
        paddingTop:10,
        paddingBottom:20,
        textDecorationLine:'underline'
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
