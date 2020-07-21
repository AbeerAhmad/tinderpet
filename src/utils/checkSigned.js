export const checkSigned = user => {
  if (Object.keys(user).length > 0) {
    return true;
  } else {
    return false;
  }
};
