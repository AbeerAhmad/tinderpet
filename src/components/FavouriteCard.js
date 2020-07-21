import React from 'react'
import { Card, View } from 'native-base'
import { Dimensions } from 'react-native'
import styles from '../assets/styles'

export const FavouriteCard=()=> {
    const fullWidth =Dimensions.get('window').width
    const imageStyle={
        width:fullWidth / 2 - 30,
        height:170,

    }
    const nameStyle = [
        {
          paddingTop: 10,
          paddingBottom:5,
          color: '#363636',
          fontSize: 15
        }
      ];
    return (
       <View style={styles.containerCardItem}>
 {/* <Image source={} style={imageStyle} /> */}
       </View>
    )
}
