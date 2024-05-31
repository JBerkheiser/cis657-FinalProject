import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddAlbumScreen from '../screens/AddAlbumScreen';

const Stack = createStackNavigator();
const ProfileStack = (navigation) =>
{    
    return(
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="AddAlbumScreen" component={AddAlbumScreen} title={'My Collection'}/>
        </Stack.Navigator>
    )
}

export default ProfileStack;