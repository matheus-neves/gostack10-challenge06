import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
            elevation: 0,
          },
          headerBackImage: () => (
            <Icon
              name="keyboard-arrow-left"
              type="MaterialIcons"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 5,
              }}
              size={35}
              color="#fff"
            />
          ),
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            width: 250,
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
