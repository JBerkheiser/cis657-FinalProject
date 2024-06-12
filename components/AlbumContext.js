import React, { createContext, useState, useContext } from 'react';

const AlbumContext = createContext();

export const AlbumProvider = ({ children }) =>
{
    /******************************* USE STATES ********************************/
    const [scannedItem, setScannedItem] = useState(null);

    /******************************* RETURN COMPONENT ********************************/
    return(
        <AlbumContext.Provider value={
        {
            scannedItem, setScannedItem
        }}
        >
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbum = () => 
{
    return useContext(AlbumContext);
}