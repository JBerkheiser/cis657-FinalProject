import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProfileEditScreen({navigation})
{
    function useHideBottomBar() {    
        useEffect(() => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
            return () =>
                navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
        }, [navigation]);
    }

    useHideBottomBar();
    
    return(
        <View style={styles.container}>
            <Text>Edit Screen</Text>
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

export default ProfileEditScreen;