import React, { useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ProfileStack} from './ProfileStack';
import {Mape, Explorer, Favorites, Chat, Profile, Petprofile, GetpetData, UserData, Petprofile1} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';


const Tabs = createStackNavigator();

export const AppTabs = () => {

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        options={{headerShown: false}}
        name="Home"
        component={Explorer}
      />
      <Tabs.Screen name="Favorite" component={Favorites} />
      <Tabs.Screen name="Chat" component={Chat} />

      <Tabs.Screen name="Map" component={Mape} />
      <Tabs.Screen name="profile" component={Profile} />
      <Tabs.Screen name="Petprofile" component={Petprofile} />
      <Tabs.Screen name="getPetprofile" component={Petprofile} />
      <Tabs.Screen name="Addpet" component={GetpetData} />
      <Tabs.Screen   options={{headerShown: false}} name="EditProfile" component={UserData} />
      <Tabs.Screen name="Petprofile1" component={Petprofile1} />

    </Tabs.Navigator>
  );
};
