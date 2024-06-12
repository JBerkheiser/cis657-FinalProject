import { getAdapter } from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import 
{ 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TouchableHighlight,
    Alert,
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
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';

const HomeScreen = ({route, navigation}) =>
{
    const [albumToUpdate, setAlbumToUpdate] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [scannedItem, setScannedItem] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [manualAdd, setManualAdd] = useState(
    {
        title: '',
        artist: '',
    });
    const [genreOpen, setGenreOpen] = useState(false);
    const [genreItems, setGenreItems] = useState([
        {label: 'Any genre', value: ''},
        {label: 'Rock', value: 'Rock'},
        {label: 'Electronic', value: 'Electronic'},
        {label: 'Pop', value: 'Pop'},
        {label: 'Folk, World, & Country', value: 'Folk, World, & Country'},
        {label: 'Jazz', value: 'Jazz'},
        {label: 'Funk / Soul', value: 'Funk / Soul'},
        {label: 'Classical', value: 'Classical'},
        {label: 'Hip Hop', value: 'Hip Hop'},
        {label: 'Latin', value: 'Latin'},
        {label: 'Stage & Screen', value: 'Stage & Screen'},
        {label: 'Reggae', value: 'Reggae'},
        {label: 'Blues', value: 'Blues'},
        {label: 'Non-Music', value: 'Non-Music'},
        {label: 'Children\'s', value: 'Children\'s'},
        {label: 'Brass & Military', value: 'Brass & Military'},
    ]);
    const [genreValue, setGenreValue] = useState('');

    const [yearSearch, setYearSearch] = useState('');
    const [yearErrorMessage, setYearErrorMessage] = useState('');

    const [ratingOpen, setRatingOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState('');
    const [ratingItems, setRatingItems] = useState([
        {label: 'Any rating', value: ''},
        {label: '1 / 10', value: 1},
        {label: '2 / 10', value: 2},
        {label: '3 / 10', value: 3},
        {label: '4 / 10', value: 4},
        {label: '5 / 10', value: 5},
        {label: '6 / 10', value: 6},
        {label: '7 / 10', value: 7},
        {label: '8 / 10', value: 8},
        {label: '9 / 10', value: 9},
        {label: '10 / 10', value: 10},
    ]);

    const [conditionOpen, setConditionOpen] = useState(false);
    const [conditionValue, setConditionValue] = useState('');
    const [conditionItems, setConditionItems] = useState([
        {label: 'Any condition', value: ''},
        {label: 'Mint', value: 'Mint'},
        {label: 'Near Mint', value: 'Near Mint'},
        {label: 'Excellent', value: 'Excellent'},
        {label: 'Very Good', value: 'Very Good'},
        {label: 'Good', value: 'Good'},
        {label: 'Fair', value: 'Fair'},
        {label: 'Poor', value: 'Poor'},
    ]);

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
            setAlbums(items);
        });
    }, []);

    useEffect(() =>
    {
        navigation.setOptions({
            headerLeft: () =>(
                <TouchableOpacity
                    onPress={() => 
                    {
                        Keyboard.dismiss();
                        setSortModalVisible(true)
                    }}
                > 
                    <AntDesign name="bars" size={24} color="black" style={{marginLeft: 25,}}/>
                </TouchableOpacity>
            ),
            headerRight: () =>(
                <TouchableOpacity
                    onPress={() => 
                    {
                        Keyboard.dismiss();
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

    const createDeleteAlert = (item) =>
    {
        Alert.alert('', 'Are you sure you want to delete this album?', [
        {
            text: 'Delete',
            onPress: () => {
                console.log('Deleted'),
                deleteAlbum(item);
            }
        },
        {
            text: 'Cancel',
            onPress: () => console.log('Cancelled'),
            style: 'cancel',
        }
        ]);
    }

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
                    onLongPress={() => createDeleteAlert(item)}
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

    function validateYear(val)
    {
        const numericValue = parseInt(val);
        if(isNaN(numericValue))
        {
            setYearErrorMessage('Must be a valid year');
            return false;
        }

        setYearErrorMessage('');
        return true;
    }

    const onRatingOpen = useCallback(() =>
    {
        setConditionOpen(false);
        setGenreOpen(false);
    }, []);

    const onConditionOpen = useCallback(() =>
    {
        setRatingOpen(false);
        setGenreOpen(false);
    }, []);

    const onGenreOpen = useCallback(() =>
    {
        setRatingOpen(false);
        setConditionOpen(false);
    }, []);

    const filterAlbums = () =>
    {
        let filteredAlbums = albums;
        if(searchQuery)
        {
            filteredAlbums = filteredAlbums.filter((album) =>
            {
                return album.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    album.title.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }
        if(genreValue)
        {
            filteredAlbums = filteredAlbums.filter(album =>
            {
                return album.genre && album.genre.includes(genreValue);
            });
        }
        if(yearSearch)
        {
            filteredAlbums = filteredAlbums.filter(album =>
            {
                return album.year && (parseInt(album.year) == parseInt(yearSearch));
            });
        }
        if(ratingValue)
        {
            filteredAlbums = filteredAlbums.filter(album =>
            {
                return album.rating && (album.rating == ratingValue);
            });
        }
        if(conditionValue)
        {
            filteredAlbums = filteredAlbums.filter(album =>
            {
                return album.condition && (album.condition === conditionValue);
            });
        }

        return filteredAlbums;
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
            <Input
                placeholder='Search by title or artist'
                value={searchQuery}
                onChangeText={val => setSearchQuery(val)}
                style={styles.searchBar}
            />
            <FlatList
            data={filterAlbums()}
            renderItem={renderAlbum}
            extraData={albums}
            keyExtractor={(item, index) => item.id.toString()}
            ItemSeparatorComponent={separator}
            />
            <Modal
                animationIn='slideInUp'
                animationOut='slideOutDown'
                isVisible={addModalVisible}
                swipeDirection={'down'}
                onSwipeComplete={() =>
                {
                    setAddModalVisible(false);
                }}
                style={{ marginRight:0, marginLeft:0,}}
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
            </Modal> 
            <Modal
                animationIn='slideInLeft'
                animationOut='slideOutLeft'
                isVisible={sortModalVisible}
                onBackdropPress={() => 
                {
                    setSortModalVisible(false)
                    
                }}
                style={{margin: 0, marginTop: 90}}
            >
                <View style={styles.sortModalView}>
                    <View style={{marginTop: 15, flex: 1,}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}> Sort By </Text>
                    </View>
                    <View style={{flex: 15, flexDirection:'column'}}>
                        <View style={{marginTop: 25}}>
                            <Text>Release Year:</Text>
                            <Input
                                placeholder='Enter Release Year'
                                onChangeText={num =>
                                {
                                    setYearSearch(num);
                                    validateYear(num);
                                }}
                                value={yearSearch}
                                errorMessage={yearErrorMessage}
                            />
                        </View>
                        <View>
                            <Text>Genre:</Text>
                            <DropDownPicker
                                open={genreOpen}
                                value={genreValue}
                                items={genreItems}
                                onOpen={onGenreOpen}
                                setOpen={setGenreOpen}
                                setValue={setGenreValue}
                                setItems={setGenreItems}
                                zIndex={1000}
                                zIndexInverse={3000}
                            />
                        </View>
                        {!genreOpen &&
                        <View style={{marginTop: 25}}>
                            <Text>Rating:</Text>
                            <DropDownPicker
                                open={ratingOpen}
                                value={ratingValue}
                                items={ratingItems}
                                onOpen={onRatingOpen}
                                setOpen={setRatingOpen}
                                setValue={setRatingValue}
                                setItems={setRatingItems}
                                zIndex={3000}
                                zIndexInverse={1000}
                            />
                        </View>
                        }
                        {!ratingOpen && !genreOpen &&
                        <View style={{marginTop: 25}}>
                            <Text>Condition:</Text>
                            <DropDownPicker
                                open={conditionOpen}
                                value={conditionValue}
                                items={conditionItems}
                                onOpen={onConditionOpen}
                                setOpen={setConditionOpen}
                                setValue={setConditionValue}
                                setItems={setConditionItems}
                                zIndex={3000}
                                zIndexInverse={1000}
                            />
                        </View>
                        }
                    </View>
                </View>
            </Modal>
        </View>
        </TouchableWithoutFeedback>
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
        flex: 1,
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
        flex:  4,
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
    sortModalView: 
    {
        backgroundColor: 'white',
        borderWidth: 5,
        borderLeftWidth: 0,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        flexDirection: 'column',
        flex: 1,
        marginRight: 150,
    },
    searchBar: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
});

export default HomeScreen;