import React, {Component} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {View, TextInput, ImageBackground} from 'react-native';
import {Content, H1, Form, Text, Button, Toast, Spinner} from 'native-base';
// import Api from '../api/googlemaps';
import geolocation from '@react-native-community/geolocation';

import Geocoder from 'react-native-geocoding';
// import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
Geocoder.init('AIzaSyB3dKe4wGAy4BC8Nq4JNU7x4Z_SOoSHXK8');
let config = {
  skipPermissionRequests: false,
  authorizationLevel: 'always',
};
// Components
import {InputField} from '../components';
import { connect } from 'react-redux';
import { AuthProvider } from '../store/Epic/AuthProvider';

 class NewComponent extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isSigninUpProgress: false,
    phoneNumber:'',
    error: {
      status: false,
      msg: '',
    },
  };

  componentWillUnmount() {
    this.setState({isSigninUpProgress: false});
  }

  signUpWithFields = async () => {
    const {email, password, firstName, lastName,phoneNumber} = this.state;

    this.setState({isSigninUpProgress: true});

    geolocation.setRNConfiguration(config);

    geolocation.getCurrentPosition(info => {
      console.log(info);
      let lat = info.coords.latitude;
      let long = info.coords.longitude;
      Geocoder.from(lat, long)
        .then(async json => {
          var addressComponent = json.results[0].formatted_address;
          console.log('asdasdasfsdfweassdf',addressComponent);
          if (
            email &&
            password &&
            firstName &&
            lastName &&
            addressComponent !== ''
          ) {
            try {
              const {
                user,
                additionalUserInfo: {profile},
              } = await auth().createUserWithEmailAndPassword(email, password);
              await firestore()
                .collection('users')
                .doc(user.uid)
                .set({
                  firstName,
                  lastName,
                  coords: {lat, long},
                  address: addressComponent,
                  email:email,
                  phoneNumber:phoneNumber
                });
this.props.getUserData({
                  firstName,
                  lastName,
                  coords: {lat, long},
                  address: addressComponent,
                })
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

          console.log(json);
          this.setState({
            addressSpinner: false,
            address: addressComponent,
            coords: {lat, long},
          });
        })
        .catch(error => {
          this.setState({
            error: {
              status: true,
              msg: 'something eent wrong',
            },
            isSigninUpProgress: false,
          });

          Toast.show({
            text: 'something went wrong',
            buttonText: 'Okay',
            type: 'danger',
            duration: 3000,
          });
        });
    });
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
  handlephoneNumberField = value => {
    this.setState({phoneNumber: value});
  };
  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      error,
      isSigninUpProgress,
      phoneNumber
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
            placeholder="Phone"
            fieldValue={phoneNumber}
            onChangeHandler={this.handlephoneNumberField}
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
const mapDispatchToprops = dispatch => {
  return {
    getUserData: (data) => {
      AuthProvider.getUserData(dispatch,data);
    },
  };
};

export const Signup = connect(null,mapDispatchToprops)(NewComponent)