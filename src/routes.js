import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repo from './pages/Repo';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7159c1',
            shadowColor: 'transparent',
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            width: 300,
            textAlign: 'center',
          },
        }}>
        <Stack.Screen name="Usuários" component={Main} />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({
            headerTitle: route.params.user.name,
          })}
        />
        <Stack.Screen
          name="Repo"
          component={Repo}
          options={({ route }) => ({ headerTitle: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
