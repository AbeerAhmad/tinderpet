import React, {useEffect, createContext, useReducer} from 'react';
// import {auth, firestore} from 'react-native-firebase';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database'
import PetsReducer from './PetReducer';

const initalState = {
allpets:{}
};

export const PetContext = createContext(initalState);

export const PetProvider = ({children}) => {
  const [state, dispatch] = useReducer(PetsReducer, initalState);

  // Actions
  function onPetChange() {
    async ()=>{

      
    await database().ref('/pets').on('child_changed',(snapshot)=>{
       
        let data=(snapshot.val())
        console.log(data)
        dispatch({type: 'ON_VALUE_CHANGE', payload: data});
       })
      }   
   
  }

  useEffect(() => {
    onPetChange();
  }, []);

  return (
    <PetContext.Provider
      value={{allPets:state.allPets,onPetChange}}>
      {children}
    </PetContext.Provider>
  );
};
