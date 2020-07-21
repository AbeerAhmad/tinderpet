import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';

export const AuthProvider = {
  Auth: dispatch => {
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
        console.log('run')
        dispatch({type: 'ON_AUTH_STATE_CHANGE', payload: {authUser,isSigned:true}});
        SplashScreen.hide();
      } else {
        dispatch({type: 'ON_AUTH_STATE_CHANGE', payload: {authUser:{},isSigned:false}});
        SplashScreen.hide();
        console.log('empty')
      }
    });
  },
};
