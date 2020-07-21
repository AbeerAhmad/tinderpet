import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Content, Button, Left, Right} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
export const Rules = props => {
  return (
    <View style={{backgroundColor: '#E4FFF9', border: 'black', height: '100%'}}>
      <Content style={styles.Container}>
        <Text style={styles.heading}>Welcome To TinderPet.</Text>
        <Text style={styles.heading}>Please Follow These Rules</Text>
        <View style={styles.viewbox}>
          <Text style={styles.subheading}>Be yourself</Text>
          <Text style={styles.text}>
            Make Sure that all the Information you Give is True .Othervise Your
            Account will be Suspended
          </Text>
          <View style={styles.view}>
            <Text style={styles.subheading}>Be Proactive </Text>
            <Text style={styles.text}> Always report bad behaviour</Text>
          </View>
        </View>

        {/*Horizontal Gradient*/}
      </Content>

      <View style={styles.buttonbox}>
        <Button
          light
          bordered
          onPressIn={() => {
            props.navigation.navigate('getPet');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#F70052', '#FE631A']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>GOT IT</Text>
          </LinearGradient>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonbox: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 0,
    marginBottom: 30,
  },
  Container: {
    marginTop: 90,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
  viewbox: {
    marginTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',

    fontFamily: 'sans-serif-condensed',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    width: 350,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
export const Getet = props => {
  return (
    <View style={style.container}>
      <Text style={style.heading}>I have a</Text>
      <View style={style.buttonbox}>
        <Button style={style.button} bordered>
          <Left />
          <Text style={style.buttontext}>DOG</Text>
          <Right />
        </Button>
        <Button style={style.button} bordered>
          <Left />
          <Text style={style.buttontext}>Cat</Text>
          <Right />
        </Button>
        <Button style={style.button} bordered>
          <Left />
          <Text style={{color: 'red', ...style.buttontext}}>BOTH</Text>
          <Right />
        </Button>
      </View>
      <View
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:30
        }}>
        <Button transparent
          onPress={() => {
            console.log('sdaasd');
            props.navigation.navigate('getDogData');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#F70052', '#FE631A']}
            style={style.linearGradient}>
            <Text style={style.buttonText}>Continue</Text>
          </LinearGradient>
        </Button>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: '100%',
  },
  heading: {
    fontSize: 50,
    fontFamily: 'Inter-VariableFont_slnt,wght',
    fontWeight: '600',
    marginLeft: 50,
    marginTop: 50,
  },
  button: {
    width: '70%',
    height: 50,
    borderColor: 'grey',
    // borderWidth: 0,
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  buttonbox: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttontext: {
    fontSize: 30,
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    width: 350,
    height: 50,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
