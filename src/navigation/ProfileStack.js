import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Profile, Petprofile, GetDog} from '../screens';
import {Head} from '../components';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={GetDog} />
      <Stack.Screen
        name="Petprofile"
        component={Petprofile}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
};
