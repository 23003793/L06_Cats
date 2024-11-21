import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home'; 
import Add from './Add';
import Edit from './Edit'; 

const Stack = createStackNavigator();

const Navigation = ({ onAddQuizItem, onEditQuizItem }) => {
  return (
    <NavigationContainer screenOptions={{headerShown:true}}>
      <Stack.Navigator>
        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        
        {/* Add Question Screen */}
        <Stack.Screen 
          name="Add" 
          component={Add} 
          initialParams={{ onAddQuizItem }} 
        />
        
        {/* Edit Question Screen */}
        <Stack.Screen 
          name="Edit" 
          component={Edit} 
          initialParams={{ onEditQuizItem }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
