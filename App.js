import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Header, Divider } from '@rneui/themed';
import Footer from './components/footer';
import { NavigationContainer } from '@react-navigation/native'; 

export default function App() 
{
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <NavigationContainer>
      <Footer></Footer>
    </NavigationContainer>
    </TouchableWithoutFeedback>
  );
}

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
