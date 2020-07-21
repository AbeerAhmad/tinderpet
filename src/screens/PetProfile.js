import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
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
} from 'native-base';


export class Petprofile extends Component {
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
                    <Image source={pet.image} style={styles.img} />
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
                    <Text>{pet.age}</Text>
                  </ListItem>
                  <ListItem>
                    <Text style={{fontSize: 18}}>Gender: </Text>
                    <Text>Male</Text>
                  </ListItem>
                </Card>
                {/* </Content> */}
                {/* <Text>Profile Screen</Text> */}
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
