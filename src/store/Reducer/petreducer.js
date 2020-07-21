let initialState = {
  pettoexplore:{},
 userPetDetails:{},
 loading:true
};

export const petreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_PETS': {
      console.log(action.payload)
      return {
        ...state,
        pettoexplore: action.payload.pettoexplore,
        userPetDetails:action.payload.userPetDetails,
        userFavourites:action.payload.userFavourites,
        loading:false
      };
    }
    case 'MAKE_LOADING_TRUE':{
return{
  ...state,
  loading:action.payload
}
    }
    case 'CHANGE_IN_PETSTOEXPLORE':{
      return{
        ...state,
        pettoexplore:action.payload
      }
    }

    default: {
      return state;
    }
  }
};
