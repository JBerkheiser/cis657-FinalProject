import React, { createContext, useState, useContext } from 'react';

const SortContext = createContext();

export const SortProvider = ({ children }) =>
{
    /******************************* USE STATES ********************************/
    const [genreValue, setGenreValue] = useState('');
    const [yearSearch, setYearSearch] = useState('');
    const [ratingValue, setRatingValue] = useState('');
    const [conditionValue, setConditionValue] = useState('');

    /******************************* RETURN COMPONENT ********************************/
    return(
        <SortContext.Provider value={
        {
            yearSearch, setYearSearch,
            genreValue, setGenreValue,
            ratingValue, setRatingValue,
            conditionValue, setConditionValue,
        }}
        >
            {children}
        </SortContext.Provider>
    );
};

export const useSort = () => 
{
    return useContext(SortContext);
}