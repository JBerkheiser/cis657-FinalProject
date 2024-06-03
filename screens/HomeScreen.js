import { getAdapter } from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity} from 'react-native';
import { getAlbum } from '../api/DiscogsServer';
import { Button } from '@rneui/themed';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({navigation}) =>
{
    const [albums, setAlbums] = useState([
    {
        Title: 'Graduation',
        Artist: 'Kanye West',
        ReleaseDate: 'September 11, 2007',
        ImageURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGraduation_%2528album%2529&psig=AOvVaw3t2u1tUgcOa8KElcHNBFG4&ust=1717205299911000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCNi7PetoYDFQAAAAAdAAAAABAE',
        Rating: '9/10',
        Condition: 'Mint',
        Genre: 'Hip-Hop',
    },
    {
        Title: 'To Pimp a Butterfly',
        Artist: 'Kendrick Lamar',
        ReleaseDate: 'November 5, 2015',
        ImageURL: 'https://www.google.com/imgres?q=to%20pimp%20a%20butterfly&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Ff%2Ff6%2FKendrick_Lamar_-_To_Pimp_a_Butterfly.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FTo_Pimp_a_Butterfly&docid=iZDwwTxlP9h77M&tbnid=rIK9nfRys1dXOM&vet=12ahUKEwiKo_f937aGAxXNmIkEHdg7AK8QM3oECBsQAA..i&w=300&h=300&hcb=2&ved=2ahUKEwiKo_f937aGAxXNmIkEHdg7AK8QM3oECBsQAA',
        Rating: '10/10',
        Condition: 'Near Mint',
        Genre: 'Hip-Hop',
    },
    ]);

    const [albumInfo, setAlbumInfo] = useState({});
    const [addModalVisible, setAddModalVisible] = useState(false);

    const separator = () =>
    {
        return(<View style={styles.separator}/>);
    };

    useEffect(() =>
    {
        getAlbum((data) =>
        {
            console.log('received: ', data);
        })
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
                    <Text>Add</Text>
                </TouchableOpacity>
            ),
        });
    });

    const renderAlbum = ({item}) =>
    {
        return(
            <View>
                <View style={styles.albumCard}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: item.ImageURL}}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text>{item.Title} - {item.Artist}</Text>
                        <Text>{item.ReleaseDate}</Text>
                        <Text>Genre: {item.Genre}</Text>
                        <View style={styles.albumCardBottom}>
                            <Text>{item.Rating}</Text>
                            <View style={styles.condition}>
                                <Text>Condition: {item.Condition}</Text>
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
                onDismiss={() => 
                {
                    console.log("CLOSING MODAL");
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
        flex: 1,
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