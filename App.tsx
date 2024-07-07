import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormScreen from './src/pages/doorToDoor.js';
import ScreeningView from './src/pages/ScreeningView.js';
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
       <Tab.Navigator>
      <Tab.Screen name="Enter Details" component={FormScreen} />
      <Tab.Screen name="View Records" component={ScreeningView} />
      </Tab.Navigator>
    </NavigationContainer>
    // <FormScreen/>
  );
};
export default App;
