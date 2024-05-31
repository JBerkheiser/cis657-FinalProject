import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileStack from './profileStack';

const Tab = createBottomTabNavigator();

const Footer = () => 
{
    return (
        <Tab.Navigator 
            initialRouteName={HomeScreen}
        >
            <Tab.Screen 
                name='My Collection' 
                component={HomeScreen}
                options={{ tabBarIcon: ({focused}) =>
                    <View>
                        <Image 
                            source={require('../assets/Home.png')}
                            resizeMode='contain'
                            style={styles.HomeIcon}
                        />
                    </View>
                }}
            ></Tab.Screen>
            <Tab.Screen 
                name='Explore' 
                component={ExploreScreen}
                options={{ tabBarIcon: ({focused}) =>
                    <View>
                        <Image 
                            source={require('../assets/Explore.jpg')}
                            resizeMode='contain'
                            style={styles.ExploreIcon}
                        />
                    </View>
                }}
            ></Tab.Screen>
            <Tab.Screen 
                name='Profile' 
                component={ProfileStack}
                options={{ tabBarIcon: ({focused}) =>
                    <View>
                        <Image 
                            source={require('../assets/Profile.png')}
                            resizeMode='contain'
                            style={styles.ProfileIcon}
                        />
                    </View>
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create(
{
    HomeIcon:
    {
        width: 25,
        height: 25,
    },
    ExploreIcon:
    {
        width: 40,
        height: 40,
    },
    ProfileIcon:
    {
        width: 24,
        height: 24,
    },
});

export default Footer;