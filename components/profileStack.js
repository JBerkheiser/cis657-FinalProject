import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Stack = createStackNavigator();
const ProfileStack = (navigation) =>
{    
    return(
        <Stack.Navigator initialRouteName="ProfileScreen">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen}/>
        </Stack.Navigator>
    )
}

export default ProfileStack;