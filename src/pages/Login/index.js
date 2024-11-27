import { Text, View, Image, ImageBackground, TextInput} from 'react-native';
import { Button, Icon, Input } from '@rneui/themed';
import React, {useState} from 'react'; 
import style from './style'

export default function Login({ navigation }){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[errorEmail, setErrorEmail] = useState(false)
    const[errorPassword, setErrorPassword] = useState(false)

      
    const validationEmail = (text) => {
        setEmail(text);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrorEmail(!regex.test(text));
    };

    const validationPassword = (text) => {
        setPassword(text);
        const regex = /^[A-Za-z\d@$!%*?&]{6,}$/;
        setErrorPassword(!regex.test(text));
      };

    const forgorPassword = () =>{
        navigation.navigate('Leads')
            
    }

    const validation = () =>{
        if (!errorEmail && !errorPassword){
            navigation.navigate('Form')
        }
    }

    const register = () =>{
        navigation.navigate('Register')
    }


    return(
        <View style={style.container}>
            <View style={{alignItems:'center', paddingTop:50}}>
                <Image 
                source={require('../assests/logo-icon-200.png')}
                />
            </View>
            
            <Text style={style.login}>Login</Text>

            <View>
                <Text style={style.formLabel} >Email</Text>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <TextInput
                    style={style.input}
                    placeholder='digite seu e-mail'
                    onChangeText={validationEmail}
                    keyboardType='email-address'
                    />
                </View>
                {errorEmail && <Text style={{color:'red'}}>Email inválido</Text>}

                <Text style={style.formLabel}>Senha</Text>
                <TextInput
                leftIcon={<Icon name='lock' size={24} color='gray'/>}
                style={style.input}
                placeholder='digite sua senha' 
                onChangeText={validationPassword}
                secureTextEntry={true}
                />
                {errorPassword && <Text style={{color:'red'}}>Senha inválida</Text>}
            </View>

            <Text style={style.forgot} onPress={forgorPassword }>Esqueceu sua senha?</Text>
            <View>
                <Button
                title="ACESSE"
                buttonStyle={{backgroundColor: 'rgba(255, 168, 53, 1)',
                borderRadius: 50,
                }}
                titleStyle={{ fontSize: 20 }}
                onPress={() => validation()}
                disabled={errorEmail || errorPassword}
                />
            </View>
                                  
            <Text style={style.createdAcount}>Não tem cadastro? 
                <Text onPress={register}
                style={{color:'rgba(254, 114, 53, 1)'}}> Criar conta</Text>
                
            </Text>
           
        </View>
      
    );
}