import React,{useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Signin, Signup, GetLocation, Rules, Getpet, GetDog} from '../screens';

const Stack = createStackNavigator();

export const AuthStack = () => {

  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{header: () => null}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="GetLocation" component={GetLocation} />
      <Stack.Screen name="Rules" component={Rules} />
      {/* <Stack.Screen name="getPet" component={Getpet} /> */}
      {/* <Stack.Screen name="getDogData" component={GetDog} /> */}
    </Stack.Navigator>
  );
};
