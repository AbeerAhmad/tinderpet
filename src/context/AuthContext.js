import React, {useEffect, createContext, useReducer} from 'react';
// import {auth, firestore} from 'react-native-firebase';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AuthReducer from './AuthReducer';

const initalState = {
  user: {},
  isSigned: false,
  splashScreen:true,
};

export const AuthContext = createContext(initalState);

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initalState);

  // Actions
  function onAuthChange() {
    auth().onAuthStateChanged(async user => {
      if (user) {
        const userData = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const authUser = {
          ...user._user,
          ...userData.data(),
        };
        dispatch({type: 'ON_AUTH_STATE_CHANGE', payload: authUser});
        
      } else {
        dispatch({type: 'ON_AUTH_STATE_CHANGE', payload: {}});
      }
    });
  }

  useEffect(() => {
    onAuthChange();
  }, []);

  return (
    <AuthContext.Provider
      value={{user: state.user, isSigned: state.isSigned, splashScreen:state.splashScreen,onAuthChange}}>
      {children}
    </AuthContext.Provider>
  );
};
