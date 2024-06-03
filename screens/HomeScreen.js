import { getAdapter } from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity} from 'react-native';
import { getAlbum } from '../api/DiscogsServer';
import { Button } from '@rneui/themed';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({route, navigation}) =>
{
    const [albums, setAlbums] = useState([]);
    const [scannedItem, setScannedItem] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);

    const separator = () =>
    {
        return(<View style={styles.separator}/>);
    };

    useEffect(() =>
    {
        navigation.setOptions({
            headerRight: () =>(
                <TouchableOpacity
                    onPress={() => 
                    {
                        setAddModalVisible(true)
                    }}
                > 
                    <Text>Add</Text>
                </TouchableOpacity>
            ),
        });
    });

    useEffect(() =>
    {
        if(route.params?.data)
        {
            console.log(`scanned code: ${route.params.data}`);
            getAlbum(route.params.data).then(album =>
            {
                setScannedItem(album.results[0]);
            }).catch(error =>
            {
                console.error('Error fetching album: ', error)
            });
        }
    }, [route.params?.data]);

    useEffect(() =>
    {
        if(scannedItem)
        {
            console.log('Album is now: ',scannedItem);
            setAlbums(prevAlbums => [...prevAlbums, scannedItem]);
        }
    }, [scannedItem]);

    const renderAlbum = ({index, item}) =>
    {
        return(
            <View>
                <View style={styles.albumCard}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{uri: item.thumb}}
                            style={{width: 100, height: 100}}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text>{item.title}</Text>
                        <Text>Genre: {item.genre}</Text>
                        <View style={styles.albumCardBottom}>
                            <Text>Rating</Text>
                            <View style={styles.condition}>
                                <Text>Condition:</Text>
                            </View>
                        </View>                    
                    </View>
                </View>
            </View>
        )
    }

    return(
        <View>
            <FlatList
            data={albums}
            renderItem={renderAlbum}
            extraData={albums}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={separator}
            />
            <Modal
                animationType='slide'
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() =>
                {
                    setAddModalVisible(false);
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.addHeader}>  
                        <TouchableOpacity
                            onPress={() =>
                            {
                                setAddModalVisible(false);
                            }}
                        >
                            <AntDesign name="leftcircle" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={{fontSize: 20}}>Add Album</Text>
                        <TouchableOpacity onPress={() => 
                        {
                            setAddModalVisible(false);
                            navigation.navigate('CameraScreen');
                        }}
                        >
                            <Entypo name="camera" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addMiddle}>

                    </View>
                    <View style={styles.addBottom}>
                        <Button 
                            style={{margin: 4}}
                            onPress={() =>
                            {
                                setAddModalVisible(false);
                            }}
                        >Save Album</Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator:
    {
        height: 2,
        backgroundColor: 'grey',
        marginLeft: 4,
        marginRight: 4,
    },
    albumCard:
    {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },  
    imageContainer:
    {
        flex: 2,
    },  
    textContainer:
    {
        flex: 4,
        alignContent: 'flex-start',
    },
    photo:
    {
        width: 10,
        height: 10,
    },
    albumCardBottom:
    {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly',
    },
    modalView: 
    {
        top: '25%',
        height: '75%',
        backgroundColor: 'white',
        borderWidth: 4,
        borderBottomWidth: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
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
        flex: 1,
    },
    cameraContainer:
    {
        flex: 1,
        width: '100%',
    },
    camera: 
    {
        width: '100%',
        height: '100%',
    },
});

export default HomeScreen;