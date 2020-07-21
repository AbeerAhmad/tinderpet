import React, {Component} from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {View, TextInput, ImageBackground} from 'react-native';
import {Content, H1, Form, Text, Button, Toast, Spinner} from 'native-base';

// Components
import {InputField} from '../components';

export class Signup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isSigninUpProgress: false,
    error: {
      status: false,
      msg: '',
    },
  };

  componentWillUnmount() {
    this.setState({isSigninUpProgress: false});
  }

  signUpWithFields = async () => {
    const {email, password, firstName, lastName} = this.state;

    this.setState({isSigninUpProgress: true});

    if (email && password && firstName && lastName !== '') {
      try {
        const {
          user,
          additionalUserInfo: {profile},
        } = await auth().createUserWithEmailAndPassword(email, password);
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({firstName, lastName});

        this.setState({isSigninUpProgress: false});
      } catch (error) {
        this.setState({
          error: {
            status: true,
            msg: error.message,
          },
          isSigninUpProgress: false,
        });
        Toast.show({
          text: error.message,
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000,
        });
      }
    } else {
      this.setState({
        error: {
          status: true,
          msg: 'any of the field should not be empty',
        },
        isSigninUpProgress: false,
      });
      Toast.show({
        text: 'any of the field should not be empty',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  handleFirstNameField = value => {
    this.setState({firstName: value});
  };
  handleLastNameField = value => {
    this.setState({lastName: value});
  };
  handleEmailField = value => {
    this.setState({email: value});
  };
  handlePasswordField = value => {
    this.setState({password: value});
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      error,
      isSigninUpProgress,
    } = this.state;
    return (
      <ImageBackground
        source={require('../assets/signup_back.png')}
        style={{width: '100%', height: '100%'}}>
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 50,
            paddingTop: 50,
          }}>
          <H1 style={{textAlign: 'center'}}>SIGN UP</H1>
          <InputField
            placeholder="First Name"
            fieldValue={firstName}
            onChangeHandler={this.handleFirstNameField}
            error={error}
          />
          <InputField
            placeholder="Last Name"
            fieldValue={lastName}
            onChangeHandler={this.handleLastNameField}
            error={error}
          />
          <InputField
            placeholder="Email"
            fieldValue={email}
            onChangeHandler={this.handleEmailField}
            error={error}
          />
          <InputField
            placeholder="Password"
            fieldValue={password}
            onChangeHandler={this.handlePasswordField}
            error={error}
            secureTextEntry={true}
          />
          <Button
            rounded
            block
            onPress={this.signUpWithFields}
            disabled={isSigninUpProgress}
            style={{marginTop: 10}}>
            {isSigninUpProgress ? (
              <Spinner color="red" />
            ) : (
              <Text>sign up</Text>
            )}
          </Button>
       
        </Content>
      </ImageBackground>
    );
  }
}
