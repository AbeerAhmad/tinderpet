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
import {Text, Header, Left, Icon, Right, Body, Button, Spinner} from 'native-base';
import Demo from '../assets/data/demo.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ticon from '../components/Icon';
import {FloatingAction} from 'react-native-floating-action';
import {FAB} from 'react-native-paper';
import { connect } from 'react-redux';
import { PetProvider } from '../store/Epic';
import SplashScreen from 'react-native-splash-screen';
let animation = new Animated.Value(0);
class Explorerclass extends Component {
  // }
  componentDidMount(){
    this.props.getpets()
    SplashScreen.hide()
  }
state={
  explorepets:{},
  loading:true
}
  static getDerivedStateFromProps(props, state){
    let pettoexplore=props.pettoexplore
    let loading=props.loading
    return{
      ...state,
      pettoexplore,
      loading
    } 
   }
  render() {

    const {navigation}=this.props
    console.log( this.props.pettoexplore)       
    let {pettoexplore}=this.state
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

          <Right style={{marginRight: 10}}>
            <Button
              transparent
              onPress={() => {
                navigation.navigate('Chat');
              }}>
              <Text style={styles.dislike}>
                {/* <Icon name="dislike" /> */}
                <Icon type="MaterialIcons" name="chat" />
              </Text>
            </Button>
          </Right>
        </Header>
{this.state.loading? <Spinner color='blue'/>: 
 <View>
   <View style={styles.containerHome}>
          <CardStack
          loop={true}
          verticalSwipe={false}
          onSwipedLeft={(data)=>{console.log('swipe left',data)}}
          onSwipedRight={(data)=>{this.props.addPetToFavourite(data)}}
          renderNoMoreCards={() => <Text style={{justifyContent:'center',alignSelf:'center',}}>No more Suggestions</Text>}
          ref={swiper => (this.swiper = swiper)}>
          {Object.keys(pettoexplore).map((item, index) => (
            <Card style={{zIndex:2}} key={item}>
            <CardItem
            image={pettoexplore[item].petProfile}
            name={pettoexplore[item].petname}
            description={item.description}
            matches={pettoexplore[item].matchprofile}
            actions
            onPressLeft={() => this.swiper.swipeLeft()}
            onPressRight={() => this.swiper.swipeRight()}
            />
            </Card>
            ))}
            </CardStack>
            </View>
            <View>
          </View>
          </View>
        }
      
          <Button
            style={styles.floatcontainer}
            onPress={() => {
              navigation.navigate('profile');
              console.log('running');
            }}>
            <Icon name="cog" style={[styles.cogIcon]} />
          </Button>
           
      
      </ImageBackground>
    );
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    auth: ()=> {
      AuthProvider.Auth(dispatch)
    },
    getpets:()=>{
      PetProvider.allpets(dispatch)
    },
    addPetToFavourite:(data)=>{
      PetProvider.addPetToFavourite(dispatch,data)
    }
  };
};
const mapStateToProps=(store)=>{
  return{
    pettoexplore:store.petreducer.pettoexplore,
loading:store.petreducer.loading
}
}
export const Explorer=connect(mapStateToProps,mapDispatchToprops)(Explorerclass)