import React, { useState, useEffect} from 'react';
import { getAlbum } from '../api/DiscogsServer';
import { Input } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';
import { useSort } from '../components/SortContext';
import SortingModal from '../components/SortingModal';
import AddingModal from '../components/AddingModal';
import { useAlbum } from '../components/AlbumContext';
import 
{ 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    TouchableOpacity,  
    TouchableWithoutFeedback,
    Keyboard,
    TouchableHighlight,
    Alert,
} from 'react-native';
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
    /******************************* USE CONTEXTS ********************************/
    const 
    {
        yearSearch,
        genreValue, 
        ratingValue,
        conditionValue,
    } = useSort();
    const
    {
        scannedItem,
        setScannedItem,
    } = useAlbum();

    /******************************* USE STATES ********************************/

    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [albumToUpdate, setAlbumToUpdate] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    /******************************* USE EFFECTS ********************************/
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

    /******************************* HELPER FUNCTIONS ********************************/
    
    const separator = () =>
    {
        return(<View style={styles.separator}/>);
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

    /******************************* RETURN COMPONENT ********************************/

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
            <AddingModal
                isVisible={addModalVisible}
                onClose={() => setAddModalVisible(false)}
                navigateCamera={navigation.navigate}
            />
            <SortingModal
                isVisible={sortModalVisible}
                onClose={() => setSortModalVisible(false)}
            />
        </View>
        </TouchableWithoutFeedback>
    );
};

/******************************* STYLE SHEET ********************************/

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
    dismiss:
    {
        top: '100%',
        height: '100%',
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
    searchBar: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
});

export default HomeScreen;