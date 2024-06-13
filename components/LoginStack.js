import { createStackNavigator } from '@react-navigation/stack';
import footer from './footer';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const LoginStack = (navigation) =>
{    
    /******************************* RETURN COMPONENT ********************************/
    return(
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
            <Stack.Screen name="App" component={footer} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default LoginStack;