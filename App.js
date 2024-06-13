import { StyleSheet, SafeAreaView } from 'react-native';
import Footer from './components/footer';
import { NavigationContainer } from '@react-navigation/native'; 
import { SortProvider } from './components/SortContext';
import { AlbumProvider } from './components/AlbumContext';
import LoginStack from './components/LoginStack';
import { useEffect } from 'react';
import initAlbumDB from './helpers/fb-albums';

export default function App() 
{
  useEffect(() =>
  {
      try
      {
      initAlbumDB();
      } catch(err)
      {
      console.log(err);
      }
  }, []);
  /******************************* RETURN COMPONENT ********************************/
  return (
    <SafeAreaView style={styles.container}>
    <AlbumProvider>
    <SortProvider>
    <NavigationContainer>
      <LoginStack/>
    </NavigationContainer>
    </SortProvider>
    </AlbumProvider>
    </SafeAreaView>
  );
}

/******************************* STYLE SHEET ********************************/
const styles = StyleSheet.create(
{
  container: 
  {
    flex: 1,
  },
  header:
  {
    flex: 1,
    backgroundColor: '#DAA66F',
  },
  middle:
  {
    flex: 1,
  },
});
