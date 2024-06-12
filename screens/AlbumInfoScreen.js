import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AlbumInfoScreen = ({navigation, route}) =>
{
    /******************************* USE STATES ********************************/
    const [albumInfo, setAlbumInfo] = useState([]);
    const [conditionOpen, setConditionOpen] = useState(false);
    const [conditionValue, setConditionValue] = useState(null);
    const [conditionItems, setConditionItems] = useState([
      {label: 'Mint', value: 'Mint'},
      {label: 'Near Mint', value: 'Near Mint'},
      {label: 'Excellent', value: 'Excellent'},
      {label: 'Very Good', value: 'Very Good'},
      {label: 'Good', value: 'Good'},
      {label: 'Fair', value: 'Fair'},
      {label: 'Poor', value: 'Poor'},
    ]);
    const [ratingOpen, setRatingOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(null);
    const [ratingItems, setRatingItems] = useState([
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

    /******************************* USE EFFECTS ********************************/
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{marginRight:10}}
                    onPress={() => {
                        console.log(ratingValue);
                        navigation.navigate('HomeScreen', {condition: conditionValue, rating: ratingValue});
                    }}
                >
                <Text style={{color: 'blue', fontSize: 16}}>Save</Text>
                </TouchableOpacity>
            ),
        });
    });

    useEffect(() =>
    {
        setAlbumInfo(route.params);
        setConditionValue(route.params.condition);
        setRatingValue(route.params.rating);
    }, [route.params]);

    /******************************* HELPER FUNCTIONS ********************************/
    const renderTracklist = ({item}) =>
    {
        return(
            <View style={{marginTop: 5,}}>
                <Text>{item.position}. {item.title}</Text>
                {item.extraartists && item.extraartists.filter(artist => artist.role === 'Featuring').map((artist, index) => (
                        <Text key={index} style={styles.subtext}>ft. {artist.name}</Text>
                    ))}
                <Text style={styles.subtext}>{item.duration? `Duration: ${item.duration}` : ''}</Text>
            </View>
        )
    }

    const onRatingOpen = useCallback(() =>
    {
        setConditionOpen(false);
    }, []);

    const onConditionOpen = useCallback(() =>
    {
        setRatingOpen(false);
    }, []);

    /******************************* RETURN COMPONENT ********************************/
    return(
        <View style={styles.container}>
            <View style={styles.leftSide}>
                <Image
                    source={{uri: albumInfo.imageURL}}
                    style={{width: 190, height: 190}}
                />
                <Text style={{fontSize: 20, fontWeight:'bold'}}>{albumInfo.title}</Text>
                <Text style={{fontSize: 15, fontWeight:'bold', marginTop: 3,}}>{albumInfo.artist}</Text>
                <Text style={{fontSize: 15, marginTop: 10,}}>Release Year: {albumInfo.year}</Text>
                <Text style={{fontSize: 15, marginTop: 3,}}>Genre: {albumInfo.genre && albumInfo.genre.length > 0 ? albumInfo.genre.slice(0, albumInfo.genre.length).join(', ') : 'No genre available'}</Text>
                <Text style={{fontSize: 15, marginTop: 3,}}>Styles: {albumInfo.styles && albumInfo.styles.length > 0 ? albumInfo.styles.slice(0, albumInfo.styles.length).join(', ') : 'No styles available'}</Text>
                <Text style={{fontSize: 15, marginTop: 40}}>Rating:</Text>
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
                <Text style={{fontSize: 15, marginTop: 20}}>Condition:</Text>
                <DropDownPicker
                    open={conditionOpen}
                    value={conditionValue}
                    items={conditionItems}
                    onOpen={onConditionOpen}
                    setOpen={setConditionOpen}
                    setValue={setConditionValue}
                    setItems={setConditionItems}
                    zIndex={1000}
                    zIndexInverse={3000}
                />
            </View>
            <View style={styles.rightSide}>
                <Text style={{fontSize: 20, textAlign:'center'}}>Track List:</Text>
                <FlatList
                    data={albumInfo.tracklist}
                    renderItem={renderTracklist}
                />
            </View>
        </View>
    );
}

/******************************* STYLE SHEET ********************************/
const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        flexDirection: 'row',
    },
    leftSide:
    {
        flex: 1,
        marginLeft: 5,
    },
    rightSide:
    {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15,
    },
    subtext:
    {
        marginLeft: 10,
    }
})

export default AlbumInfoScreen;