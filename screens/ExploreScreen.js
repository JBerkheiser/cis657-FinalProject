import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExploreScreen = ({navigation}) =>
{
    return(
        <View style={styles.container}>
            <Text>Explore Screen</Text>
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

export default ExploreScreen;