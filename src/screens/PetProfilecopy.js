import React, {Component} from 'react';
import {Image, StyleSheet, ImageBackground, Platform, Linking} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

import {
  Left,
  Right,
  H2,
  Content,
  Separator,
  ListItem,
  Card,
  CardItem,
  View,
  Text,
  Icon,
  Body,
} from 'native-base';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

export class Petprofile1 extends Component {
state={
  pet:{}
}
  componentDidMount() {
    const {petid} = this.props.route.params;
    if (petid) {
database()
        .ref('pets/'+petid)
        .on('value', snapshot => {
          
          let data = (snapshot.val() && snapshot.val()) || {};
          console.log(data)
         this.setState({

          pet:data
         })
        });
    }
  }
  openMap=(coords,name)=>{
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
const latLng = `${coords.lat},${coords.long}`;
const label =  `${name}'s location`;
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`
});


Linking.openURL(url); 
  }
  render() {
   console.log( this.props.route.params)
   const {pet }=this.state
   const {petuser}=this.props.route.params
    return (
      <Content>
        <View>
          <Card >
            <ImageBackground  source={{uri:pet.petProfile}} style={styles.bg}  imageStyle= 
{{opacity:0.5}} >
            <View >
            <Left />
            <View style={styles.center}>
              <Image source={{uri:pet.petProfile}} style={styles.img} />
                    <H2>{pet.petname}</H2>
            </View>
            <Right />
            {/* <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#eee',
              }}
            /> */}
            {/* <Separator /> */}
            <ListItem>
              <Text style={{fontSize: 18}}>Breed: {pet.breed} </Text>
              <Text />
            </ListItem>
            <ListItem>
              <Text style={{fontSize: 18}}>Age: {pet.dob} </Text>
              {/* <Text>{pet.age}</Text> */}
            </ListItem>
            <ListItem>
              <Text style={{fontSize: 18}}>Gender: {pet.gender} </Text>
            </ListItem>
            </View>
            </ImageBackground>
          </Card>
          <Card style={{marginLeft:10,marginRight:10,marginTop:20,borderTopLeftRadius:20,borderTopRightRadius:20}}>
          <Left />
            <View style={styles.center}>
              <Image source={ petuser.ProfileImage
                  ? {uri: petuser.ProfileImage}
                  : require('../assets/user.jpg/')} style={styles.img} />
                    <H2>{ petuser.firstName + ' ' + petuser.lastName}</H2>
            </View>
            <Right />
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#eee',
              }}
            />
            <Separator />
            <Card>
            <CardItem header icon>
              <Left>
                <Text>Address</Text>
              </Left>
              <Right>
                <Button onPress={()=>this.openMap(petuser.coords,petuser.firstName)}>Open in Map</Button>
                </Right>
            </CardItem>
            <ListItem>
              <Text>
              {petuser.address}
              </Text>
            </ListItem>
            </Card>
            <Card>
            <CardItem header>
              <Text>Contact Details</Text>
              <Right>
              </Right>
            </CardItem>
            {
              petuser.phoneNumber &&
            <ListItem icon>
              <Left>
                <Button style={{margin:0,padding:0}} onPress={()=>Linking.openURL(`sms:${petuser.phoneNumber}?body=Hi ${petuser.firstName},i am here from tinderpet`)}>
                <Icon type="MaterialIcons" name="phone" />
                </Button>
              </Left>
              <Body>
                <Text>{petuser.phoneNumber}</Text>
              </Body>
            </ListItem>
            }
              {
              petuser.email &&
            <ListItem icon>
              <Left>
                {/* <Button onPress={()=>Linking.openURL(`sms:0300851217?body=Hi,${petuser.phoneNumber} here from tinderpet`)}> */}
                <Icon type="MaterialIcons" name="mail" />
                {/* </Button> */}
              </Left>
              <Body>
                <Text>{petuser.email}</Text>
              </Body>
            </ListItem>
            }
            <ListItem>
              <Text style={{fontSize: 18}}>Gender: {pet.gender} </Text>
            </ListItem>
            </Card>
          </Card>
        </View>
      </Content>
    );
  }
}
const petAvatarSize = 70;
const styles = StyleSheet.create({
  img: {
    width: 120,
    height: 120,
    marginTop: 40,
    borderRadius: 120 / 2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  petContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  petAvatar: {
    width: petAvatarSize,
    height: petAvatarSize,
    borderRadius: petAvatarSize / 2,
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  
    
  },overlay: {
    backgroundColor:'rgba(255,0,0,0.5)',
},
  petcard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
