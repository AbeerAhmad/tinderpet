import React,{useEffect, useState} from 'react';
import styles from '../assets/styles';
import firestore from '@react-native-firebase/firestore';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import {useSelector} from 'react-redux'
import { Button } from 'react-native-paper';
const  GOOGLE_DISTANCES_API_KEY='AIzaSyCu724oEFEZdEw2ze8HH-Pa-nZ0HCPoESk'
import {useNavigation} from '@react-navigation/native'
const CardItem = ({
  actions,
  description,
  image,
  matches,
  name,
  onPressLeft,
  onPressRight,
  status,
  variant,
  ownerid,
  petid,
  getlocation
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? 170 : 350,
      margin: variant ? 0 : 20
    }
  ];
  const navigation = useNavigation();
  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30
    }
  ];
const usercoords = useSelector(state => state.authReducer.user.coords)
// console.log(user,'getting user from reducer')
const [userValue, setuser] = useState('')
const [distance, setdistance] = useState([])
const getDistance =async (target) => {
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
useEffect(() => {
  CardDetails()
}, [ownerid])
 const CardDetails=()=>{

  var docRef =firestore().collection("users").doc(ownerid);
 docRef.get().then( (doc)=> {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        let otheruserData=doc.data()
        console.log(otheruserData)
        
       setuser(otheruserData)
       getDistance(otheruserData.coords)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}

  return (
    <View style={styles.containerCardItem}>
     
      {/* IMAGE */}
      <Image source={{ uri:image}} style={imageStyle} />

      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
           {/* <Icon name="heart"/> */}
            <Image style={{width:50,height:50,borderRadius:30/2}} source={{ uri:matches}}/>
        </View>
      )}

      {/* NAME */}
      

      {/* DESCRIPTION */}
      {/* {description && (      <Text style={styles.descriptionCardItem}>{description}</Text>
      )} */}

     
    {/* {CardDetails()} */}
    {
        
<Button onPress={()=>{navigation.navigate('Petprofile1',{petid:petid,petuser:userValue,distance:distance})}}><Text style={nameStyle}>{name}</Text></Button>
}

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
         

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressRight()}
          >
            <Text style={styles.star}>
              <Icon name="star" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
            <Text style={styles.dislike}>
              <Icon name="dislike" />
            </Text>
          </TouchableOpacity>
      
        </View>
      )}

      {
      
      <View style={{position:'absolute',left:(variant?10:50),height:60,padding:10,borderBottomLeftRadius:30,borderBottomRightRadius:30,backgroundColor:'orange',top:(variant?0:10)}}><Text>{distance[0]}</Text><Text>{distance[1]}</Text></View>
      }
  
    </View>
  );
};

export default CardItem;
