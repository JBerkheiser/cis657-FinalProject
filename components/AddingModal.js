import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo } from '@expo/vector-icons';
import { getAlbumManual } from '../api/DiscogsServer';
import { AntDesign } from '@expo/vector-icons';
import { Button, Input } from '@rneui/themed';
import { useAlbum } from './AlbumContext';
import 
{ 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native';


const AddingModal = ({ isVisible, onClose, navigateCamera }) =>
{
    /******************************* USE CONTEXTS ********************************/
    const
    {
        setScannedItem,
    } = useAlbum();

    /******************************* USE STATES ********************************/
    const [manualAdd, setManualAdd] = useState(
    {
        title: '',
        artist: '',
    });

    /******************************* HELPER FUNCTIONS ********************************/
    const updateManualAddObject = (vals) => {
        setManualAdd({
        ...manualAdd,
        ...vals,
        });
    };

    /******************************* RETURN COMPONENT ********************************/
    return(
        <Modal
            animationIn='slideInUp'
            animationOut='slideOutDown'
            isVisible={isVisible}
            swipeDirection={'down'}
            onSwipeComplete={onClose}
            style={{ marginRight:0, marginLeft:0,}}
        >
            <View style={styles.modalView}>
                <View style={styles.addHeader}>  
                    <TouchableOpacity
                        onPress={onClose}
                    >
                        <AntDesign name="leftcircle" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20}}>Add Album</Text>
                    <TouchableOpacity onPress={() => 
                    {
                        onClose();
                        navigateCamera('CameraScreen');
                    }}
                    >
                        <Entypo name="camera" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.addMiddle}>
                <KeyboardAwareScrollView>
                <View>
                    <Input
                        placeholder='Enter the albums title'
                        value={manualAdd.title}
                        autoCorrect={false}
                        onChangeText={(val) => updateManualAddObject({ title: val })}
                    />
                    <Input
                        placeholder='Enter the artist'
                        value={manualAdd.artist}
                        autoCorrect={false}
                        onChangeText={(val) => updateManualAddObject({ artist: val })}
                    />
                </View>
                </KeyboardAwareScrollView>
                </View>
                <View style={styles.addBottom}>
                    <Button 
                        style={{margin: 4}}
                        onPress={() =>
                        {
                            onClose();
                            getAlbumManual(manualAdd.artist, manualAdd.title).then(album =>
                            {
                                setScannedItem(album);
                            }).catch(error =>
                            {
                                console.error('Error fetching album: ', error)
                            });
                            updateManualAddObject({artist: '', title: ''});
                        }}
                    >Save Album</Button>
                </View>
            </View>
        </Modal> 
    )
}

/******************************* STYLE SHEET ********************************/
const styles = StyleSheet.create(
{
    modalView: 
    {
        top: '30%',
        height: '70%',
        backgroundColor: 'white',
        borderWidth: 4,
        borderBottomWidth: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flexDirection: 'column',
        flex: 1,
    },
    addHeader:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 7,
    },
    addMiddle:
    {
        flex: 5,
    },
    addBottom:
    {
        flex:  4,
    },
});

export default AddingModal;