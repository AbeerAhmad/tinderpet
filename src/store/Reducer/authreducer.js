
import {checkSigned} from '../../utils';
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

    default: {
      return state;
    }
  }
};


