const user = (state = { isLoggedIn: null }, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_USER":
      newState = action.results ? action.results : {};
      newState.isLoggedIn = action?.results?.email ? true : false;
      break;
  }
  return newState;
};

export default user;
