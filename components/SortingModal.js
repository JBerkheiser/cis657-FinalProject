import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Input } from  '@rneui/themed';
import React, { useState, useCallback } from 'react';
import { useSort } from './SortContext';
import
{
    View,
    Text,
    StyleSheet,
} from 'react-native';

const SortingModal = ({ isVisible, onClose }) =>
{
    /******************************* USE CONTEXTS ********************************/
    const {
        yearSearch, setYearSearch,
        genreValue, setGenreValue,
        ratingValue, setRatingValue,
        conditionValue, setConditionValue,
    } = useSort();

    /******************************* USE STATES ********************************/
    const [yearErrorMessage, setYearErrorMessage] = useState('');
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
    const [ratingOpen, setRatingOpen] = useState(false);
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

    /******************************* HELPER FUNCTIONS ********************************/
    function validateYear(val)
    {
        const numericValue = parseInt(val);
        if(!(isNaN(numericValue)) || (!val))
        {
            setYearErrorMessage('');
            return true;
        }

        setYearErrorMessage('Must be a valid year');
        return false;
    }

    const handleYearChange = (num) => 
    {
        if (validateYear(num)) {
            setYearSearch(num);
        }
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

    /******************************* RETURN COMPONENT ********************************/
    return(
        <Modal
            animationIn='slideInLeft'
            animationOut='slideOutLeft'
            isVisible={isVisible}
            onBackdropPress={onClose}
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
                            onChangeText={handleYearChange}
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
    )
}

/******************************* STYLE SHEET ********************************/
const styles = StyleSheet.create(
{
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
});

export default SortingModal;
