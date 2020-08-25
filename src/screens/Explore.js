import React, {useState, Component} from 'react';
import {
  View,
  ImageBackground,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import City from '../components/City';
import Filters from '../components/Filters';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import {
  Text,
  Header,
  Left,
  Icon,
  Right,
  Body,
  Button,
  Spinner,
  H2,
} from 'native-base';
import Demo from '../assets/data/demo.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ticon from '../components/Icon';
import {FloatingAction} from 'react-native-floating-action';
import {FAB} from 'react-native-paper';
import {connect} from 'react-redux';
import {PetProvider} from '../store/Epic';
import SplashScreen from 'react-native-splash-screen';
// import GoogleMatrix from 'google-distance-matrix';
let animation = new Animated.Value(0);
var origins = ['San Francisco CA'];
var destinations = ['New York NY', '41.8337329,-87.7321554'];

class Explorerclass extends Component {
  // }
  componentDidMount() {
    this.props.getpets();
    SplashScreen.hide();
  }
  state = {
    explorepets: {},
    loading: true,
  };
  static getDerivedStateFromProps(props, state) {
    let pettoexplore = props.pettoexplore;
    let loading = props.loading;
    return {
      ...state,
      pettoexplore,
      loading,
    };
  }
  CardDetails=()=>{

    var docRef =firestore().collection("users").doc(ownerid);
   docRef.get().then( (doc)=> {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          let otheruserData=doc.data()
          console.log(otheruserData)
          
         setuser(otheruserData.firstName)
         getDistance(otheruserData.coords)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  }
  getDistance =async (target) => {
    const BaseLocation = `${usercoords.lat}+${usercoords.long}`;
    // get locations of targets
    const TargetLocation = `${target.lat}+${target.long}`
  
    // prepare final API call
    // let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    // let params = `origins=${BaseLocation}&destinations=${TargetLocation}`;  
    // let finalApiURL = `${ApiURL}${encodeURI(params)}`;
  let finalApiURL=`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${BaseLocation}&destinations=${TargetLocation}&key=${GOOGLE_DISTANCES_API_KEY}`
  
    // get duration/distance from base to each target
    try {
            let response =await  fetch(finalApiURL);
            let responseJson =await response.json();
            console.log("responseJson:\n");
            console.log(responseJson);
            let distance=responseJson.rows[0].elements[0].distance.text
  let newd=distance.split(' ')
            setdistance(newd)
            console.log(newd)
  
        } catch(error) {
            console.error(error);
        } 
  };
  render() {
    const {navigation} = this.props;
    console.log(this.props.pettoexplore);
    let {pettoexplore} = this.state;
    return (
      <ImageBackground
        source={require('../assets/images/bg.png')}
        style={styles.bg}>
        <Header style={styles.homeHeader}>
          <Left style={{marginLeft: 10}}>
            {/* <TouchableOpacity
          > */}
            <Button
              transparent
              onPress={() => {
                navigation.navigate('Favorite');
              }}>
              {/* <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}> */}
              <Text style={styles.star}>
                <Ticon name="star" />
              </Text>
              {/* </TouchableOpacity> */}
            </Button>
            {/* </TouchableOpacity> */}
          </Left>
<Body><Text>Explore</Text></Body>
          <Right style={{marginRight: 10}}>
          <Button
         transparent
          onPress={() => {
            navigation.navigate('profile');
            console.log('running');
          }}>
          <Icon name="cog" style={[styles.cogIcon]} />
        </Button>
          </Right>
        </Header>
      
        {this.state.loading ? (
          <Spinner color="blue" />
        ) : (
          <View>
            <View style={styles.containerHome}>
              <CardStack
               loop={false}
                verticalSwipe={true}
              
                onSwipedRight={data => {
                  this.props.addPetToFavourite(data);
                }}
                renderNoMoreCards={() => (
                  <View style={{alignItems: 'center', paddingTop: 100}}>
                    <Text style={{color: 'blue'}}>
                      <Icon type="MaterialIcons" name="error-outline" />
                    </Text>
                    <Text>No Suggestions</Text>
                    {/* </Card> */}
                  </View>
                )}
                ref={swiper => (this.swiper = swiper)}>
                {Object.keys(pettoexplore).map((item, index) => (
                  <Card style={{zIndex: 2}} key={item}>
                    <CardItem
                    petid={item}
                      image={pettoexplore[item].petProfile}
                      name={pettoexplore[item].petname}
                      description={item.description}
                      matches={pettoexplore[item].matchprofile}
                      actions
                      onPressLeft={() => this.swiper.swipeLeft()}
                      onPressRight={() => this.swiper.swipeRight()}
                      getlocation={this.getlocation}
                      ownerid={pettoexplore[item].ownerid}
                    />
                  </Card>
                ))}
              </CardStack>
            </View>
            <View />
          </View>
        )}
  
      </ImageBackground>
    );
  }
}
const mapDispatchToprops = dispatch => {
  return {
    auth: () => {
      AuthProvider.Auth(dispatch);
    },
    getpets: () => {
      PetProvider.allpets(dispatch);
    },
    addPetToFavourite: data => {
      PetProvider.addPetToFavourite(dispatch, data);
    },
  };
};
const mapStateToProps = store => {
  return {
    pettoexplore: store.petreducer.pettoexplore,
    loading: store.petreducer.loading,
    user: store.authReducer.user,
  };
};
export const Explorer = connect(
  mapStateToProps,
  mapDispatchToprops,
)(Explorerclass);
