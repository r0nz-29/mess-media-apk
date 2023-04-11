import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import MessList from './src/pages/MessList';
import Login from './src/pages/Login';
import {NavigationRoutesWithParams} from './src/types/navigation';
import MessDetails from './src/pages/Mess';

const Stack = createNativeStackNavigator<NavigationRoutesWithParams>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MessList"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MessList" component={MessList} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Mess" component={MessDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
