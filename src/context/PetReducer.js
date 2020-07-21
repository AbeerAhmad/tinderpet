
let initial ={
  allPets:{}
}
export default (state=initial, action) => {
  switch (action.type) {
    case 'ON_VALUE_CHANGE':
      return {
        ...state,
        allPets:action.payload
      };
    default:
      return state;
  }
};
