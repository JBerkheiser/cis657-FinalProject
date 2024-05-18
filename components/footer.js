import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';

const Footer = () => 
{
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator 
            initialRouteName={HomeScreen}
            tabBarOptions=
            {{
                showLabel: false,
            }}
        >
            <Tab.Screen 
                name='Home' 
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
                component={ProfileScreen}
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
        width: 30,
        height: 30,
    },
    ExploreIcon:
    {
        width: 45,
        height: 45,
    },
    ProfileIcon:
    {
        width: 29,
        height: 29,
    },
});

export default Footer;