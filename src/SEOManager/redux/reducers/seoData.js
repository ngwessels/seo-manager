const SeoData = (state = { initial: {}, manager: {}, plan: {} }, action) => {
  switch (action.type) {
    case "SET_INITIAL_SEO_DATA":
      return { ...state, initial: action.results || {} };

    case "SET_MANAGER_SEO_DATA":
      return { ...state, manager: action.results || {} };

    case "UPDATE_MANAGER_SEO_DATA":
      return {
        ...state,
        manager: {
          ...state.manager,
          [action.location]: action.results
        }
      };

    case "SET_MANAGER_PROJECT_PLAN":
      return { ...state, plan: action.results };

    default:
      return state; // If no action matches, return the current state
  }
};

export default SeoData;
