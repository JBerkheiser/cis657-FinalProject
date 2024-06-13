import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, { useState } from 'react';
import { Input, Button } from '@rneui/themed';
import {initAlbumDB} from '../helpers/fb-albums';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation })
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return(
        <View style={{flex: 1,}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1, flexDirection:'column'}}>
                <View style={{flex: 1, alignContent: 'center',}}>
                    <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', textAlign:'center'}}> Login</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'column'}}>
                    <View style={styles.inputContainer}>
                        <Input 
                            placeholder='Email' 
                            placeholderTextColor={'black'} 
                            value={email}
                            onChangeText={val => setEmail(val)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input 
                            placeholder='Password' 
                            placeholderTextColor={'black'}
                            value={password}
                            onChangeText={val => setPassword(val)}
                        />
                    </View>
                    <Button
                        style={styles.button} 
                        buttonStyle={{borderRadius: 20}}
                        onPress={() =>
                        {
                            try
                            {
                            initAlbumDB();
                            } catch(err)
                            {
                            console.log(err);
                            }

                            const auth = getAuth();
                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => 
                                {
                                    const user = userCredential.user;
                                    console.log("User logged in successfully:", user);
                                    navigation.navigate('App');
                                })
                                .catch((error) => 
                                {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    console.error("Error logging in user:", errorCode, errorMessage);
                                });
                        }}  
                    >
                        Login
                    </Button>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                            <Text style={{color: '#0000EE'}}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create(
{
    inputContainer:
    { 
        backgroundColor: '#d3d3d3',
        height: 60, 
        margin: 15,
        marginTop: 0,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    button:
    {
        alignSelf: 'center',
        width: 250,
    },
});