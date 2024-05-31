import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddAlbumScreen = () => 
{
    return(
        <View style={styles.container}>
            <Text>Add Album</Text>
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
});

export default AddAlbumScreen;