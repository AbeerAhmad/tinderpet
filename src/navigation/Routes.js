import React, {useContext, useEffect, Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthStack} from './AuthStack';
import {AppTabs} from './AppTabs';
import SplashScreen from 'react-native-splash-screen';
import { connect } from "react-redux";
 class Routes extends Component {

state={
  isSigned:false
}
  static getDerivedStateFromProps(props, state){
    let isSigned=props.isSigned
    console.log(isSigned)
    return{
      ...state,
      isSigned,
    } 
   }
render(){
  console.log(this.props.isSigned)

  return (
    <NavigationContainer>
      {this.state.isSigned ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );}
};
const mapStateToProps=(store)=>{
  return{
isSigned: store.authReducer.isSigned
  }
}

export default connect(mapStateToProps)(Routes)