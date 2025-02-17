const user = (state = { isLoggedIn: null }, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.results, // Spread the new user data
        isLoggedIn: action?.results?.email ? true : false
      };
    default:
      return state; // Return the current state if no action matches
  }
};
export default user;
