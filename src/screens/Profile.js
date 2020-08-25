import React, {Component, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';

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
import {AuthProvider} from '../store/Epic';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';

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
  render() {
    const {navigation} = this.props;
    const user = this.props.user;
    let userpets = this.props.userPetDetails;
    return (
      <Content>
        <View>
          {/* pet avatar */}

          <View style={{marginTop: 20, ...styles.center}}>
            <Image
              source={
                user.ProfileImage
                  ? {uri: user.ProfileImage}
                  : require('../assets/user.jpg/')
              }
              style={styles.img}
            />
            <H2>{user.displayName || user.firstName + ' ' + user.lastName}</H2>

            <Button
              transparent
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Text>Edit Profile</Text>
            </Button>
          </View>

          {/*  show pets*/}

          <View
            style={{
              width: '100%',
              height: 1,
            }}
          />
          <Card style={{backgroundColor: 'white', padding: 20}}>
            <ImageBackground source={require('../storage/paw.jpg')} style={{ flex: 1,
    resizeMode: 'cover',}} imageStyle= 
{{opacity:0.05}} >
            <CardItem>
              <Separator>
                <Text style={styles.text}>Pets</Text>
              </Separator>
            </CardItem>
            {/* <View style={styles.petContainer}> */}
            <FlatList
              numColumns={3}
              data={Object.keys(userpets)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
               
                return (
                  <View key={userpets[item].id} style={styles.petcard}>
                    <TouchableHighlight
                      onPress={() =>
                        navigation.navigate('Petprofile', {
                          pet: userpets[item],
                        })
                      }>
                      <Image
                        source={{uri: userpets[item].petProfile}}
                        style={styles.petAvatar}
                      />
                    </TouchableHighlight>
                    <Text style={{color:'grey'}}>{userpets[item].petname}</Text>
                  </View>
                );
              }}
            />
  <TouchableWithoutFeedback
                      onPress={() => navigation.navigate('Addpet')}>
                      <View
                        style={{
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          ...styles.petAvatar,
                        }}>
                        <Icon type="MaterialIcons" name="add" />
                      </View>
                    </TouchableWithoutFeedback>
            {/* </View> */}
            </ImageBackground></Card>

          {/* <Content> */}

          <Card style={{paddingBottom: 20}}>
            <CardItem header>
              <Text>Contact info</Text>
            </CardItem>
            <ListItem icon>
              <Left>
                <Icon type="MaterialIcons" name="phone" />
              </Left>
              <Body>
                <Text>{user.phoneNumber}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon type="MaterialIcons" name="mail" />
              </Left>
              <Body>
                <Text>{user.email}</Text>
              </Body>
            </ListItem>
            <CardItem header icon>
              <Left>
                <Text>Address</Text>
              </Left>
            </CardItem>
            <ListItem>
              <Text>{user.address}</Text>
            </ListItem>
          </Card>
          {/* </Content> */}
          {/* <Text>Profile Screen</Text> */}
          <Card />
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
export const Profile = connect(
  mapStateToProps,
  mapDispatchToprops,
)(NewProfile);
const petAvatarSize = 70;
