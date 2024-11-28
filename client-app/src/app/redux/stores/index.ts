import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../slices/commonSlice";
import userReducer from "../slices/userSlice";
import shortUrlsReducer from "../slices/shortUrlSlice";

const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    shortUrls: shortUrlsReducer,
  },
});

export default store;