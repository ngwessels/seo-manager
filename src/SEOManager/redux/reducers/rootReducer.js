//Redux
import { combineReducers } from "redux";

//Components
import user from "./user";
import SeoData from "./seoData";
import version from "./version";

const rootReducer = combineReducers({
  user,
  seoData: SeoData,
  version
});

export default rootReducer;
