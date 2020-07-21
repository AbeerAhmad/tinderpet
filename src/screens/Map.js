import React from 'react';
import {StyleSheet, Text, View, TextInput,Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
// import { Image } from 'native-base';
// import {user} from '../Shared'
// import './css/map.css';

const SignUser = {
  name: 'Abeer Ahmad',
  coordinates: {
    latitude: 31.4751635,
    longitude: 73.0594099,
  },
};
export class Mape extends React.Component {
  state = {
    markers: [
      {
        title: 'hello',
        coordinates: {
          latitude: 31.4751635,
          longitude: 73.0610099,
        },
      },
      {
        title: 'hello',
        coordinates: {
          latitude: 3.149771,
          longitude: 101.655449,
        },
      },
      {
        title: 'Assad',
        coordinates: {
          latitude: 31.4751635,
          longitude: 73.055,
        },
      },
    ],
    mapRegion: {
      latitude: 31.4751635,
      longitude: 73.0594099,
      latitudeDelta: 0.3,
      longitudeDelta: 0.0421,
    },
  };
  onRegionChange = region => {
    this.setState({region});
  };
  coor = (a, b) => {
    console.log(a);
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          // showsUserLocation={true},
          region={this.state.mapRegion}
          onPress={(data, base) => {
            this.coor(data, base);
          }}
          style={styles.map}
          initialRegion={{
            latitude: SignUser.coordinates.latitude,
            longitude: SignUser.coordinates.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          customMapStyle={mapStyle}>
          {this.state.markers.map((marker, i) => (
            <View key='i'><MapView.Marker
              // key={i}
              coordinate={marker.coordinates}
              title={marker.title}
              description={'this is the reasn'}
              //  icon={require('../storage/abc.jpg/')}

            >
              <Image source={require('../storage/abc.jpg/')} style={styles.img}/>
            </MapView.Marker>
            </View>
          ))}
          {/* onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))} */}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  img:{
    width:40,
    height:40,
    margin:5,
    borderRadius: 45
  }
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];
