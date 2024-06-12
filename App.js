import { StyleSheet } from 'react-native';
import Footer from './components/footer';
import { NavigationContainer } from '@react-navigation/native'; 
import { SortProvider } from './components/SortContext';
import { AlbumProvider } from './components/AlbumContext';

export default function App() 
{
  /******************************* RETURN COMPONENT ********************************/
  return (
    <AlbumProvider>
    <SortProvider>
    <NavigationContainer>
      <Footer/>
    </NavigationContainer>
    </SortProvider>
    </AlbumProvider>
  );
}

/******************************* STYLE SHEET ********************************/
const styles = StyleSheet.create(
{
  container: 
  {
    flex: 1,
    backgroundColor: '#DAA66F',
    alignItems: 'center',
    justifyContent: 'center',
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
