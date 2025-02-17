import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import SeoData from "./seoData";
import version from "./version";

const store = configureStore({
  reducer: {
    user,
    seoData: SeoData,
    version
  },
  serializableCheck: false
});

export default store;
