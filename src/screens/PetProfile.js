import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
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
  Button,
  Toast,
} from 'native-base';


export class Petprofile extends Component {
  handleDelete=()=>{
    const {pet} = this.props.route.params;
console.log('function is running')
    database().ref('pets/'+pet.id).remove()
    .then(data=>{
      Toast.show({
        text: "Deleted successfully",
        buttonText: "Okay",
        duration: 2000,
        type:'danger',
        position: "top"
      })
      this.props.navigation.navigate('profile')}
      ).catch(err=>Toast.show({
        text: "something went wrong",
        buttonText: "Okay",
        duration: 3000
      }))
  }
  render() {
    const {pet} = this.props.route.params;
    // console.log(typeof(image))
    // const profile= require()
    return (
     
         
            <Content>
              <View>
                <Card>
                  <Left />
                  <View style={styles.center}>
                    <Image source={{uri:pet.petProfile}} style={styles.img} />
                    <H2>{pet.name}</H2>
                  </View>
                  <Right />
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#eee',
                    }}></View>
                  <Separator></Separator>
                  <ListItem>
                    <Text style={{fontSize: 18}}>Breed: </Text>
                    <Text>{pet.breed}</Text>
                  </ListItem>
                  <ListItem>
                    <Text style={{fontSize: 18}}>Age: </Text>
                    <Text>{pet.dob}</Text>
                  </ListItem>
                  <ListItem>
                    <Text style={{fontSize: 18}}>Gender: </Text>
                  <Text>{pet.gender}</Text>
                  </ListItem>
                </Card>
                {/* </Content> */}
                {/* <Text>Profile Screen</Text> */}
<Button onPress={this.handleDelete} style={{backgroundColor:'red'}} block><Text>Delete</Text></Button>
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
  petcard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
