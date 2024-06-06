import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import AlbumInfoScreen from '../screens/AlbumInfoScreen';

const Stack = createStackNavigator();
const HomeStack = (navigation) =>
{    
    return(
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AlbumInfoScreen" component={AlbumInfoScreen}/>
        </Stack.Navigator>
    )
}

export default HomeStack;