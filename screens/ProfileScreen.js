import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '@rneui/themed';

const ProfileScreen = ({navigation}) =>
{
    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/Profile.png')}
                style={styles.profileIcon}
            ></Image>
            <Text style={styles.profileText}>User</Text>
            <Button
                title='Edit'
                onPress={() => navigation.navigate("ProfileEditScreen")}
            />
        </View>
    )
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        alignItems: 'center',
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