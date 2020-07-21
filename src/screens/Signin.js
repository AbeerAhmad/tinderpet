import React, {Component} from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {ImageBackground} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {Content, H1, Form, Text, Button, Toast, Spinner} from 'native-base';

// Components
import {InputField} from '../components';
import { connect } from 'react-redux';
import { AuthProvider } from '../store/Epic';

 class Signinclass extends Component {
  state = {
    isSigninInProgress: false,
    email: '',
    password: '',
    showToast: false,
    error: {
      status: false,
      msg: '',
    },
  };

  componentDidMount() {
    GoogleSignin.configure();
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const data = await GoogleSignin.getTokens();

      const credential = auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );

      const {
        user,
        additionalUserInfo: {profile},
      } = await auth().signInWithCredential(credential);

      // const colData = {
      //   firstName: profile.given_name,
      //   lastName: profile.family_name,
      //   email: user.email,
      //   emailVerified: user.emailVerified,
      //   isAnonymous: user.isAnonymous,
      //   phoneNumber: user.phoneNumber,
      //   photoURL: user.photoURL,
      // };

      // this.props.navigation.navigate('SignedIn');

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.show({
          text: 'play service is not available',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000,
        });
      } else {
        Toast.show({
          text: 'plz try again later :)',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000,
        });
      }
    }
  };

  signInWithFields = async () => {
    const {email, password} = this.state;
    this.setState({isSigninInProgress: true});

    if (email && password !== '') {
      try {
        const {
          user,
          additionalUserInfo: {profile},
        } = await auth().signInWithEmailAndPassword(email, password);
        this.setState({isSigninInProgress: false});
        // this.props.auth()
      } catch (error) {
        this.setState({
          error: {status: true, msg: error},
          isSigninInProgress: false,
        });
        Toast.show({
          text: 'email or password is incorrect',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000,
        });
      }
    } else {
      this.setState({
        error: {
          status: true,
          msg: 'email or password should not be empty',
        },
        isSigninInProgress: false,
      });
      Toast.show({
        text: 'email or password should not be empty',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  handleEmailField = value => {
    this.setState({email: value});
  };

  handlePasswordField = value => {
    this.setState({password: value});
  };

  render() {
    const {email, password, error, isSigninInProgress} = this.state;
    return (
      <ImageBackground
        source={require('../assets/sigin_in_back.jpg')}
        style={{width: '100%', height: '100%'}}>
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 50,
            paddingTop: 70,
          }}>
          <GoogleSigninButton
            style={{width: '100%', height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn}
            disabled={isSigninInProgress}
          />
          <H1 style={{textAlign: 'center', marginVertical: 20}}>OR</H1>
          <Form>
            <InputField
              placeholder="Email"
              onChangeHandler={this.handleEmailField}
              fieldValue={email}
              error={error}
            />
            <InputField
              placeholder="Password"
              onChangeHandler={this.handlePasswordField}
              fieldValue={password}
              error={error}
              secureTextEntry={true}
            />
          </Form>
          <Button
            rounded
            block
            onPress={this.signInWithFields}
            disabled={isSigninInProgress}
            style={{marginTop: 10}}>
            {isSigninInProgress ? (
              <Spinner color="red" />
            ) : (
              <Text>sign in</Text>
            )}
          </Button>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={{textTransform: 'lowercase'}}>create an account?</Text>
          </Button>
        </Content>
      </ImageBackground>
    );
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    auth: ()=> {
      AuthProvider.Auth(dispatch)
    },
    
  };
};
export const Signin=connect(null,mapDispatchToprops)(Signinclass)