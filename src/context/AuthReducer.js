import {checkSigned} from '../utils';
let initial ={
  splashScreen:true
}
export default (state, action) => {
  switch (action.type) {
    case 'ON_AUTH_STATE_CHANGE':
      return {
        ...state,
        user: action.payload,
        isSigned: checkSigned(action.payload),
        splashScreen:false
      };
    default:
      return state;
  }
};
