import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = ({route, navigation}) =>
{
    const [name, setName] = useState('User');
    const [imageURL, setImageURL] = useState('../assets/Profile.png');
    const [bio, setBio] = useState('bio');
    const [birthday, setBirthday] = useState('birthday');

    useEffect(() => 
    {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => 
                        navigation.navigate('ProfileEditScreen', {
                            name, 
                            imageURL, 
                            bio
                        })
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

        if(route.params?.name)
        {
            setName(route.params.name);
            console.log("Profile Name: " + name);
            console.log("Profile route: " + route.params.name);
        }
        if(route.params?.imageURL)
        {
            setImageURL(route.params.imageURL);
        }
        if(route.params?.bio)
        {
            setBio(route.params.bio);
        }
    }, [route.params?.name, route.params?.imageURL, route.params?.bio]);

    return(
        <View style={styles.container}>
            <Card>
                <Card.Title>{name}</Card.Title>
                <Card.Image source={{url: imageURL}}/>
                <Text style={styles.profileText}>{bio}</Text>
            </Card>
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
    profileIcon:
    {
        width: 100,
        height: 100,
        marginTop: 20,
        marginBottom: 20,
    },
    profileText:
    {
        marginTop: 10,
        alignItems: 'right',
    },  
})

export default ProfileScreen;