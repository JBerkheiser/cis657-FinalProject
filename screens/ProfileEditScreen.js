import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfileEditScreen({route, navigation})
{
    let initialName = route.params.name;
    const initialBio = route.params.bio;
    const initialURL = route.params.imageURL;
    const [name, setName] = useState(initialName);
    const [imageURL, setImageURL] = useState(initialURL);
    const [bio, setBio] = useState(initialBio);
    const [birthday, setBirthday] = useState('birthday');


    function hideBottomBar() {    
        useEffect(() => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
            return () =>
                navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
        }, [navigation]);
    }

    useEffect(() =>
    {
        navigation.setOptions(
        {
            headerRight: () =>
            (
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                    <Text> Cancel </Text>
                </TouchableOpacity>
            ),
            headerLeft: () =>
            (
                <TouchableOpacity 
                    onPress={() => 
                    {
                        navigation.navigate('ProfileScreen', {
                            name,
                            imageURL,
                            bio,
                        });

                        initialName = name;
                        console.log("init: " + initialName);
                        console.log("name: " + name);
                        console.log("route: " + route.params.name);
                    }}
                >
                    <Text> Save </Text>
                </TouchableOpacity>
            ),
        });
    });

    hideBottomBar();

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Input 
                placeholder='Enter name'
                value={name}
                onChangeText={setName}
            /> 
            <Input 
                placeholder='Enter bio'
                value={bio}
                onChangeText={setBio}
            /> 
            <Input 
                placeholder='Enter Birthday'
                value={birthday}
                onChangeText={setBirthday}
            /> 
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ProfileEditScreen;