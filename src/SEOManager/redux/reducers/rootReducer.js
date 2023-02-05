//Redux
import { combineReducers } from "redux";

//Components
import user from "./user";
import SeoData from "./seoData";

const rootReducer = combineReducers({
  user,
  seoData: SeoData
});

export default rootReducer;
