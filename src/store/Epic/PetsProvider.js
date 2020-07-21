import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import store from '../index';
import {object} from 'prop-types';

export const PetProvider = {
  allpets: dispatch => {
    //  console.log(getState)
// dispatch({type:'MAKE_LOADING_TRUE',payload:true})
    database()
      .ref('pets')
      .on('value', snapshot => {
        let data = (snapshot.val() && snapshot.val()) || {};
        const state = store.getState();
        let userpetdetails = {};
let userFavourites={}
        let signin = state.authReducer.isSigned;
        if (signin) {
          let userpets =
            (state.authReducer.user.pets && state.authReducer.user.pets) || [];
          console.log(userpets);
          let favourites =
          (state.authReducer.user.favourites && state.authReducer.user.favourites) || [];
          Object.keys(data).map((item, i) => {
            let flag = userpets.indexOf(item);
            if (flag !== -1) {
              //add user pet info
              userpetdetails[item] = data[item];
              //delete user pets from all pets
              delete data[item];
            }
          });
          Object.keys(data).map((item, i) => {
            let flag = favourites.indexOf(item);
            if (flag !== -1) {
              //add user favourites
              userFavourites[item] = data[item];
              //delete user favourites from all pets
              delete data[item];
            }
          });
          console.log('userpetdetail', userpetdetails);
          console.log('remainings', data);
          let pettoexplore = {};
          Object.keys(userpetdetails).map((item, i) => {
            Object.keys(data).forEach((dataitem, i) => {
              if (
                userpetdetails[item].specie == data[dataitem].specie &&
                userpetdetails[item].breed == data[dataitem].breed &&
                userpetdetails[item].gender !== data[dataitem].gender
              ) {
                data[dataitem].matchprofile = userpetdetails[item].petProfile;
                pettoexplore[dataitem] = data[dataitem];
              }
            });
          });
console.log(pettoexplore)
          dispatch({
            type: 'GET_ALL_PETS', 
            payload: {userPetDetails: userpetdetails, pettoexplore: pettoexplore,userFavourites:userFavourites},
          });
        }
      });
  },
  addPetToFavourite: (dispatch,ownprops) => {

   const newstore=store.getState();
  const petstoexplore=newstore.petreducer.pettoexplore
  let uid=newstore.authReducer.user.uid
 console.log(petstoexplore)
let favourtepet=Object.keys(petstoexplore)[ownprops]
console.log(favourtepet)
  var updateuser = firestore()
  .collection('users')
  .doc(uid);
updateuser.update({
  favourites: firestore.FieldValue.arrayUnion(favourtepet),
});
 delete petstoexplore[favourtepet]
 dispatch({type:'CHANGE_IN_PETSTOEXPLORE',payload:petstoexplore})
  },
};
