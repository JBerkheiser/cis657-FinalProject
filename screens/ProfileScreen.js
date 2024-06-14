import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUpProfileListener } from '../helpers/fb-albums';

const ProfileScreen = ({route, navigation}) =>
{
    const [profileInfo, setProfileInfo] = useState(
    {
        name: 'User',
        bio: 'bio',
    });
    const [name, setName] = useState('User');
    const [imageURL, setImageURL] = useState('../assets/Profile.png');
    const [bio, setBio] = useState('bio');
    const [currentUserID, setCurrentUserID] = useState('');

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
        if(currentUserID)
        {
            setUpProfileListener(currentUserID, setProfileInfo);
        }
    }, [currentUserID]);

    useEffect(() => 
    {
        navigation.setOptions({
            headerLeft: () => (
                <View/>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => 
                        navigation.navigate('ProfileEditScreen')
                    }
                >
                    <Feather 
                        style={{ marginRight: 10 }}
                        name="edit"
                        size={24}
                    />
                </TouchableOpacity>
            ),
        });
    });

    return(
        <View style={styles.container}>
            <View style={styles.profileTop}>
                <View style={styles.picAndName}>
                    <Image
                        source={imageURL}
                        style={{
                            height: 155,
                            width: 155,
                            borderRadius: 90,
                            borderWidth: 2,
                            margin: 5,
                        }}
                    />
                    <View style={styles.infoSection}>
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{profileInfo.name}</Text>
                    </View>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={{fontSize: 20, marginTop: 10,}}>{profileInfo.bio}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        justifyContent: 'Top',
    },
    profileTop:
    {
        borderBottomWidth: 2, 
        borderBottomColor: 'grey'
    },
    picAndName:
    {
        flexDirection: 'row'
    },
    infoSection:
    {
        flex: 2, 
        flexDirection: 'column',
        marginLeft: 15,
    },
    bioContainer:
    {
        marginTop: 10, 
        marginLeft: 10,
    }
})

export default ProfileScreen;