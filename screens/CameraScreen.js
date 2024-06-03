import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const CameraScreen = ({navigation}) =>
{
    const [scanned, setScanned] = useState(false);

    useEffect(() => 
    {
        // This effect will run when the component mounts and unmounts
        hideBottomBar();
        return () => showBottomBar();
    }, []); // Empty dependency array ensures this effect runs only once

    function hideBottomBar() 
    {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    }

    function showBottomBar() 
    {
        navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) 
    {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) 
    {
        // Camera permissions are not granted yet.
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    const handleBarCodeScanned = ({type, data}) =>
    {
        setScanned(true);
        navigation.navigate('HomeScreen', {data});
    }

    function toggleCameraFacing() 
    {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return(
        <View style={styles.container}>
            <CameraView 
                style={styles.camera} 
                facing={facing}
                barcodeScannerSettings=
                {{
                    barcodeTypes: ['upc_a'],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
                <View style={{flex: 8}}></View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => 
                        {
                            navigation.navigate('HomeScreen');
                        }}
                    >
                        <Fontisto name="arrow-return-left" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialCommunityIcons name="camera-flip" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'grey',
    },
    button: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
});

export default CameraScreen