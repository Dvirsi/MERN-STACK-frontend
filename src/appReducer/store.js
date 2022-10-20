import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "./memberSlice";
import movieSlice from "./movieSlice";
import userSlice from "./userSlice";
import subscriptionsSlice from "./subscriptionsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    movies: movieSlice.reducer,
    members: memberSlice.reducer,
    subs: subscriptionsSlice.reducer,
  },
});
