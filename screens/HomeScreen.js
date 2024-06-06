import { getAdapter } from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import 
{ 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    Modal, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TouchableHighlight,
} from 'react-native';
import { getAlbum, getAlbumManual } from '../api/DiscogsServer';
import { Button, Input } from '@rneui/themed';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import 
{
    initAlbumDB,
    setupAlbumListener,
    storeAlbumItem,
    updateAlbum,
    deleteAlbum,
} from '../helpers/fb-albums';

const HomeScreen = ({route, navigation}) =>
{
    const [albumToUpdate, setAlbumToUpdate] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [scannedItem, setScannedItem] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [manualAdd, setManualAdd] = useState(
    {
        title: '',
        artist: '',
    });

    const separator = () =>
    {
        return(<View style={styles.separator}/>);
    };

    useEffect(() =>
    {
        try
        {
        initAlbumDB();
        } catch(err)
        {
        console.log(err);
        }
        setupAlbumListener((items) =>
        {
            console.log('setting state with: ', items);
            setAlbums(items);
        });
    }, []);

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
                    <FontAwesome6 name="add" size={24} color="black" style={{marginRight: 25,}}/>
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
                setScannedItem(album);
            }).catch(error =>
            {
                console.error('Error fetching album: ', error)
            });
        }
    }, [route.params?.data]);

    useEffect(() => {
        if (albumToUpdate && (route.params?.condition || route.params?.rating)) {
            console.log('Updating album: ', route.params.condition, route.params.rating);
            const updatedAlbum = {
                ...albumToUpdate,
                condition: route.params.condition,
                rating: route.params.rating,
            };

            updateAlbum(updatedAlbum); // Update the album in the database

            setAlbumToUpdate(null);
        }
    }, [route.params?.condition, route.params?.rating]);


    useEffect(() =>
    {
        if(scannedItem)
        {
            setAlbums(prevAlbums => [...prevAlbums, scannedItem]);
            storeAlbumItem(scannedItem);
            setScannedItem(null);
        }
    }, [scannedItem]);

    
    const updateManualAddObject = (vals) => {
        setManualAdd({
        ...manualAdd,
        ...vals,
        });
    };

    const renderAlbum = ({item}) =>
    {
        return(
            <View>
                <TouchableHighlight
                    onPress={() =>
                    {
                        setAlbumToUpdate(item)
                        navigation.navigate('AlbumInfoScreen',
                        {
                            title: item.title,
                            artist: item.artist.name,
                            genre: item.genre,
                            styles: item.styles,
                            tracklist: item.trackList,
                            imageURL: item.imageURL,
                            year: item.year,
                            condition: item.condition,
                            rating: item.rating,
                        });
                    }}
                >
                    <View style={styles.albumCard}>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={{uri: item.thumbURL}}
                                style={{width: 100, height: 100,}}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text>{item.title}</Text>
                            <Text>{item.artist.name}</Text>
                            <Text>Genre: {item.genre && item.genre.length > 0 ? item.genre.slice(0, item.genre.length).join(', ') : 'No genre available'}</Text>
                            <View style={styles.albumCardBottom}>
                                <Rating
                                    type='star'
                                    fractions={2}
                                    startingValue={item.rating? item.rating / 2 : 0}
                                    imageSize={17}
                                    readonly
                                />
                                <Text style={{marginLeft: 5,}}>Condition: {item.condition}</Text>
                            </View>                    
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    return(
        <View>
            <FlatList
            data={albums}
            renderItem={renderAlbum}
            extraData={albums}
            keyExtractor={(item, index) => item.id.toString()}
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                setAddModalVisible(false);
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
                </TouchableWithoutFeedback>
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
        justifyContent: 'flex-start',
    },
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
    },
    dismiss:
    {
        top: '100%',
        height: '100%',
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