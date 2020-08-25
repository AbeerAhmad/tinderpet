import React, {Component} from 'react';
import firestore from '@react-native-firebase/firestore'

import geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  TouchableWithoutFeedback,
  NativeModules,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';


import {
  Item,
  Input,
  Label,
  View,
  Button,
  Text,
  Spinner,Header,Title,
  Right,
  Icon,Textarea, Toast, Left, Body, Container
} from 'native-base';
import styles from '../assets/styles';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
// import Api from '../api/googlemaps';
import Geocoder from 'react-native-geocoding';
// import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
Geocoder.init('AIzaSyB3dKe4wGAy4BC8Nq4JNU7x4Z_SOoSHXK8');
let config = {
  skipPermissionRequests: false,
  authorizationLevel: 'always',
};
var ImagePicker = NativeModules.ImageCropPicker;
class newComponent extends Component {
  state = {
    imageSpinner: false,
    addressSpinner: false,
  };
  //   static getDerivedStateFromProps(props, state) {
  //     let user = props.user;

  //     return {
  //       ...state,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       ProfileImage: user.ProfileImage,
  //       userlocation: user.Userlocation || {},
  //     };
  //   }
  componentDidMount() {
    let user = this.props.user;
    console.log(user)
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      ProfileImage: user.ProfileImage,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
      coords:user.coords
    });
  }
  pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        // var newPostKey = database().ref().child('images').push().key;
        this.setState({
          imageSpinner: true,
        });
        const reference = storage()
          .ref('/userProfile/' + image.modificationDate)
          .putFile(image.path);
        reference.on(
          'state_changed',
          function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          function(error) {
            // Handle unsuccessful uploads
            console.log(error);
          },
          async () => {
            console.log('asdasda');
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            const url = await storage()
              .ref('/userProfile/' + image.modificationDate)
              .getDownloadURL();
            // setpetProfile(url);
            this.setState({
              ProfileImage: url,
              imageSpinner: false,
            });
            console.log('success');
          },
        );
        let file = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        this.setState({
          image: file,
          images: null,
        });
      })
      .catch(e => {
        console.log(e.message ? e.message : e);
      });
  };
  getlocation = async () => {
    this.setState({
      addressSpinner: true,
    });
    geolocation.setRNConfiguration(config);

    geolocation.getCurrentPosition(info => {
      console.log(info);
      let lat = info.coords.latitude;
      let long = info.coords.longitude;
      Geocoder.from(lat, long)
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
         console.log(json)
          this.setState({
            addressSpinner: false,
            address: addressComponent,
            coords: {lat, long},
          });
        })
        .catch(error => {
          this.setState({
            addressSpinner: false, 
          });
          console.warn(error);
        });
    });
  };

  saveChanges=()=>{
    let user = this.props.user;
    let {
      imageSpinner,
      firstName,
      lastName,
      email,
      phoneNumber,
      ProfileImage,
      address,addressSpinner,coords
    } = this.state;
    firestore()
    .collection('users')
    .doc(user.uid).update({
      firstName:firstName,
      lastName:lastName,
      email:email,
      phoneNumber:phoneNumber,
      ProfileImage:ProfileImage,
      address:address,
      coords:coords

    }).then(()=> {
     Toast.show({
      text: 'Successfully updated',
      buttonText: "Okay",
      type: "success",
      duration: 3000
     })
  })
  .catch(function(error) {
    Toast.show({
      text: "Something went wrong",
      buttonText: "Okay",
      type: "danger",
      duration: 3000
     })
  });

  }
  render() {
    let {user} = this.props;
    let {
      imageSpinner,
      firstName,
      lastName,
      email,
      phoneNumber,
      ProfileImage,
      address,addressSpinner
    } = this.state;
    return (
      <Container>
                <Header style={{backgroundColor:'white',color:'black'}}>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Text >              <Icon name='arrow-back' /></Text>

            </Button>
          </Left>
          <Body>
            <Title style={{color:'black',fontSize:16}}>Edit Profile</Title>
          </Body>
          <Right>
          <Button onPress={this.saveChanges} transparent ><Text style={{textAlign:'right',color:'blue'}}>update</Text></Button>
          </Right>
        </Header>
 
      <ScrollView>
        <View>
       
          <View style={styles.center}>
            <TouchableWithoutFeedback onPress={() => this.pickSingle(true)}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  marginTop: 40,
                  borderRadius: 120 / 2,
                  backgroundColor: 'lightgrey',
                  justifyContent:'center'
                }}>
                {imageSpinner ? (
                  <Spinner />
                ) : (
                  <Image
                    source={
                      ProfileImage
                        ? {uri: ProfileImage}
                        : require('../assets/user.jpg/')
                    }
                    style={({margin: 0}, styles.img)}
                  />
                )}
                
              </View>
            </TouchableWithoutFeedback>
          </View>
          {/*  */}
          <View style={{margin: 10}}>
            <Item floatingLabel style={{padding: 5, margin: 5}}>
              <Label>First Name</Label>
              <Input
                value={firstName}
                onChangeText={value => this.setState({firstName: value})}
              />
            </Item>
            <Item floatingLabel style={{padding: 5, margin: 5}}>
              <Label>lastName</Label>
              <Input
                value={lastName}
                onChangeText={value => this.setState({firstName: value})}
              />
            </Item>
            <Item floatingLabel style={{padding: 5, margin: 5}}>
              <Label>Email</Label>
              <Input
                disabled
                value={email}
                onChangeText={value => this.setState({email: value})}
              />
            </Item>
            <Item floatingLabel style={{padding: 5, margin: 5}}>
              <Label>Contact</Label>
              <Input
                value={phoneNumber}
                onChangeText={value => this.setState({phoneNumber: value})}
              />
            </Item>
            <Item style={{padding: 5, margin: 5}}>
              <Input
                placeholder="Address"
                value={address}
                disabled={addressSpinner}
              />
              {addressSpinner ? (
                <Spinner size='small'/>
              ) : (
                <TouchableWithoutFeedback onPress={this.getlocation}>
                  <Icon active type="MaterialIcons" name="location-on" />
                </TouchableWithoutFeedback>
              )}
            </Item>
            <View />
          <Text style={{fontSize:14,color:'lightgrey'}}>* click the location icon to get your coorinates location </Text>
            <View />
          </View>
        </View>
      </ScrollView></Container>
    );
  }
}
const mapStateToProps = store => {
  return {
    user: store.authReducer.user,
    userPetDetails: store.petreducer.userPetDetails,
  };
};
const mapDispatchToprops = dispatch => {
  return {
    auth: () => {
      AuthProvider.Auth(dispatch);
    },
  };
};
//   export const UserData = connect(
//     mapStateToProps,
//     mapDispatchToprops,
//   )(newComponent);
export const UserData = connect(mapStateToProps)(newComponent);
