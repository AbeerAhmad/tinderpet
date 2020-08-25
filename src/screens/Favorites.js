import React, { Component } from 'react';
import styles from '../assets/styles';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList
} from 'react-native';
import database from '@react-native-firebase/database';
import CardItem from '../components/CardItem';
import Icon from '../components/Icon';
import Demo from '../assets/data/demo.js';
import { connect } from 'react-redux';

class Favoritesclass extends Component {
state={
  userFavourites:{}
}
    componentDidMount(){
      
        console.log(this.props.userFavourites)
        const {userFavourites}=this.props
        if(userFavourites){
          userFavourites.map((item,i)=>{
            database()
            .ref('pets/'+item)
            .on('value', snapshot => {
            console.log(snapshot.val())
            let data=snapshot.val()
            let newfav=this.state.userFavourites
            newfav[item]=data
            this.setState({
              userFavourites:newfav
            })
            })
          })

        }
      }
  render(){
    const {userFavourites}=this.state
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <View style={styles.containerMatches}>
        

          <FlatList
            numColumns={2}
            data={Object.keys(userFavourites)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <CardItem
                  image={userFavourites[item].petProfile}
                  name={userFavourites[item].petname}
                  petid={item}
                  ownerid={userFavourites[item].ownerid}
                  variant
                />
              </TouchableOpacity>
            )}
          />
       
      </View>
    </ImageBackground>
  );}
};
const mapStateToProps=(store)=>{
  return{
    userFavourites:store.authReducer.user.favourites,
loading:store.petreducer.loading
}
}

export const Favorites=connect(mapStateToProps)(Favoritesclass)