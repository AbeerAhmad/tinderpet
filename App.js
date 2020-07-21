import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Root, Container} from 'native-base';

import Routes from './src/navigation/Routes';
import {AuthProvider, PetProvider} from './src/store/Epic';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.auth()
    

  }
  render() {
   
    return (
      <Root>
        <Container>
          <Routes />
        </Container>
      </Root>
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
    }
  };
};
export default connect(null,mapDispatchToprops)(App);
