
let initialState = {
  splashScreen: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_AUTH_STATE_CHANGE': {
      return {
        ...state,
        user: action.payload.authUser,
        isSigned: action.payload.isSigned,
        splashScreen: false,
      };
    }
    case 'ADDITIONAL_DATA':{
      return{
        ...state,
        user:{...state.user,...action.payload.ownprops}
      }

    }
    case 'ADD_PET_IN_USER_ARRAY':{
      let user=state.user
      let userpets=user.pets||[]
      console.log(user)
      let pets=[...userpets,action.payload]
      console.log(pets)
      return{
        ...state,
        user:{...state.user,pets:pets}

      }
    }
    case 'ADD_PET_TO_USER_FAVOURITE':{
      let user=state.user
      let userfavourites=user.favourites||[]
      console.log(user)
      let favourites=[...userfavourites,action.payload]
      console.log(favourites)
      return{
        ...state,
        user:{...state.user,favourites:favourites}

      }
    }

    default: {
      return state;
    }
  }
};


