import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = ({navigation}) =>
{
    return(
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
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

export default ProfileScreen;