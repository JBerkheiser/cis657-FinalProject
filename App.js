import { StyleSheet, SafeAreaView } from 'react-native';
import Footer from './components/footer';
import { NavigationContainer } from '@react-navigation/native'; 
import { SortProvider } from './components/SortContext';
import { AlbumProvider } from './components/AlbumContext';
import LoginStack from './components/LoginStack';
import { useEffect, useRef } from 'react';
import initAlbumDB from './helpers/fb-albums';
// import analytics from "@react-native-firebase/analytics";

export default function App() 
{
  // const navigationRef = useRef();
  // const routeNameRef = useRef();

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
    <NavigationContainer
      // ref={navigationRef}
      // onReady={() =>
      //   (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      // }
      // onStateChange={ async () => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = navigationRef.current.getCurrentRoute().name;
      //   if (previousRouteName !== currentRouteName) {
      //     await analytics().logEvent("screen_view", {
      //       screen_name: currentRouteName,
      //       screen_class: currentRouteName,
      //     });
      //   }
      //   // Save the current route name for later comparison
      //   routeNameRef.current = currentRouteName;
      // }}
    >
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
