import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfileEditScreen({route, navigation})
{
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [bio, setBio] = useState('');
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
                        initialName = name;
                        navigation.navigate('ProfileScreen', {
                            name,
                            imageURL,
                            bio,
                        });
                    }}
                >
                    <Text> Save </Text>
                </TouchableOpacity>
            ),
        });
    });

    useEffect(() =>
    {
        if(route.params?.name)
        {
            setName(route.params.name);
        }
        if(route.params?.bio)
        {
            setBio(route.params.bio);
        }
        if(route.params?.imageURL)
        {
            setImageURL(route.params.imageURL);
        }
    }, [route.params?.name, route.params?.bio, route.params?.imageURL]);

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