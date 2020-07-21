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
import CardItem from '../components/CardItem';
import Icon from '../components/Icon';
import Demo from '../assets/data/demo.js';
import { connect } from 'react-redux';

class Favoritesclass extends Component {
  render(){
    const {userFavourites}=this.props
    console.log(userFavourites)
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <View style={styles.containerMatches}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.title}>Matches</Text>
          
          </View>

          <FlatList
            numColumns={2}
            data={Object.keys(userFavourites)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <CardItem
                  image={userFavourites[item].petProfile}
                  name={item.name}
                  status={item.status}
                  variant
                />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );}
};
const mapStateToProps=(store)=>{
  return{
    userFavourites:store.petreducer.userFavourites,
loading:store.petreducer.loading
}
}

export const Favorites=connect(mapStateToProps)(Favoritesclass)