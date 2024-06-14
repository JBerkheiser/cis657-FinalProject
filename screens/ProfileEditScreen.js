import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Input } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setUpProfileListener, updateProfileInfo } from '../helpers/fb-albums';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ProfileEditScreen({route, navigation})
{
    const [profileInfo, setProfileInfo] = useState(
    {
        name: '',
        bio: '',
    });
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [bio, setBio] = useState('');
    const [birthday, setBirthday] = useState('birthday');
    const [currentUserID, setCurrentUserID] = useState('');


    function hideBottomBar() {    
        useEffect(() => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
            return () =>
                navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
        }, [navigation]);
    }

    useEffect(() =>
    {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) =>
        {
            if(user)
            {
                setCurrentUserID(user.uid);
            }
            else
            {
                console.log('User not signed in');
            }
        })
    }, []);

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
                        updateProfileInfo(currentUserID, profileInfo);
                        navigation.navigate('ProfileScreen');
                    }}
                >
                    <Text> Save </Text>
                </TouchableOpacity>
            ),
        });
    });

    useEffect(() =>
    {
        if(currentUserID)
        {
            setUpProfileListener(currentUserID, setProfileInfo);
        }
    }, [currentUserID]);

    hideBottomBar();

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Input 
                placeholder='Enter name'
                value={profileInfo.name}
                onChangeText={val => setProfileInfo({...profileInfo, name: val})}
            /> 
            <Input 
                placeholder='Enter bio'
                value={profileInfo.bio}
                onChangeText={val => setProfileInfo({...profileInfo, bio: val})}
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