import { View } from 'react-native';
import { Button} from '@rneui/themed';
import style from '../../pages/Login/style';
import { useState } from 'react';

const[errorEmail, setErrorEmail] = useState(false)
const[errorPassword, setErrorPassword] = useState(false)

export default function ButtonLogin (){

const validation = () =>{
    if (!errorEmail && !errorPassword){
        navigation.navigate('Form')
    }
}

    return(
        
        <>

            <Button
            title="ACESSE"
            buttonStyle={{backgroundColor: 'rgba(255, 168, 53, 1)',
            borderRadius: 50,
            }}
            titleStyle={{ fontSize: 20 }}
            onPress={() => validation()}
            disabled={errorEmail || errorPassword}
            />
        </>


    );

}






    