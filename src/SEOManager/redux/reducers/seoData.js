const SeoData = (state = { initial: {}, manager: {}, plan: {} }, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_INITIAL_SEO_DATA":
      newState.initial = action.results ? action.results : {};
      break;
    case "SET_MANAGER_SEO_DATA":
      newState.manager = action.results ? action.results : {};
      break;
    case "UPDATE_MANAGER_SEO_DATA":
      newState.manager[action.location] = action.results;
      break;
    case "SET_MANAGER_PROJECT_PLAN":
      newState.plan = action.results;
      break;
  }
  return newState;
};

export default SeoData;
