import React, {Component, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {Image, TouchableHighlight, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import geolocation from '@react-native-community/geolocation'

import {
  Left,
  Right,
  Body,
  H2,
  Content,
  Separator,
  ListItem,
  Card,
  CardItem,
  Icon,
  View,
  Button,
  Text,
} from 'native-base';

import styles from '../assets/styles';
import { AuthProvider } from '../store/Epic';
import { TouchableOpacity } from 'react-native-gesture-handler';
let config={
  skipPermissionRequests :true,
  authorizationLevel : 'always'
}
geolocation.setRNConfiguration(config);
const Cats = [
  {
    name: 'pumpkin',
    image: require('../storage/Cat-1.jpg/'),
    age: '2 year 7 month',
    gender: 'Male',
    breed: 'punchface',
  },
];
class NewProfile extends Component {
  getlocation=()=>{
    geolocation.setRNConfiguration(config);
    geolocation.getCurrentPosition(info => console.log(info));
  }
  render() {
    const {navigation} = this.props;
    const user = this.props.user;
    let userpets=this.props.userPetDetails 
    return (
      <Content>
        <View>
          <Left />
          <View style={styles.center}>
            <Image
              source={user.ProfileImage || require('../storage/abc.jpg/')}
              style={styles.img}
            />
            <H2>{user.displayName || user.firstName + ' ' + user.lastName}</H2>
          </View>
          <Right />
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#eee',
            }}
          />
          <Card>
            <CardItem header>
              <Separator>
                <Text style={styles.text}>Pets</Text>
              </Separator>
            </CardItem>
            <View style={styles.petContainer}>
              {Object.keys(userpets).map((pet, i) => {
                return (
                  <View key={i} style={styles.petcard}>
                    <TouchableHighlight
                      onPress={() =>
                        navigation.navigate('Petprofile', {
                          pet: userpets[pet],
                        })
                      }>
                      <Image
                        source={{uri: userpets[pet].petProfile}}
                        style={styles.petAvatar}
                      />
                    </TouchableHighlight>
                    <Text>{userpets[pet].petname}</Text>
                  </View>
                );
              })}
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Addpet')}>
              <View style={{borderWidth:1,justifyContent:'center',alignItems:'center',...styles.petAvatar}}>
              <Icon type="MaterialIcons" name="add" />
              </View>
                </TouchableWithoutFeedback>
            </View>
          </Card>

          {/* <Content> */}
          <Card>
            <CardItem header icon>
              <Left>
                <Text>Address</Text>
              </Left>
              <Right>
                <Button onPress={()=>this.getlocation()}>
                <Icon type="MaterialIcons" name="edit" />
                </Button>
              </Right>
            </CardItem>
            <ListItem>
              <Text>
                p37,abuzar ghaffari street ,Riaz ul janah town ,masjid ismail
                Road ,
              </Text>
            </ListItem>
            <ListItem>
              <Text>Faisalabad</Text>
            </ListItem>
            <ListItem last>
              <Text>38000</Text>
            </ListItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Contact info</Text>
            </CardItem>
            <ListItem icon>
              <Left>
                <Icon type="MaterialIcons" name="phone" />
              </Left>
              <Body>
                <Text>03008501217</Text>
              </Body>
              <Right>
                <Icon type="MaterialIcons" name="edit" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon type="MaterialIcons" name="mail" />
              </Left>
              <Body>
                <Text>abeerahmad204@gmail.com</Text>
              </Body>
              <Right>
                <Icon type="MaterialIcons" name="edit" />
              </Right>
            </ListItem>
          </Card>
          {/* </Content> */}
          {/* <Text>Profile Screen</Text> */}

          <Button
            block
            onPress={() => {
              auth().signOut();
             
            }}>
            <Text>Sign Out</Text>
          </Button>
        </View>
      </Content>
    );
  }
}
const mapStateToProps = store => {
  return {
    user: store.authReducer.user,
    userPetDetails:store.petreducer.userPetDetails
  };
};
const mapDispatchToprops = (dispatch) => {
  return {
    auth: ()=> {
      AuthProvider.Auth(dispatch)
    },
  };
};
export const Profile = connect(mapStateToProps,mapDispatchToprops)(NewProfile);
const petAvatarSize = 70;
