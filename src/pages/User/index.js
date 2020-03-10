import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export default function User({ route }) {
  console.tron.log(route.params.user);
  return (
    <View>
      <Text>User</Text>
    </View>
  );
}
