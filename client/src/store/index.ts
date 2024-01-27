import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session";
import pairedChatLogReducer from "./pairedChatLog";
import pairedUserReducer from "./pairedUser";

const store = configureStore({
  // configure store with the reducer here, toolkit should come with redux-thunk middlewaree by default
  reducer: {
    session: sessionReducer,
    pairedChatLog: pairedChatLogReducer,
    pairedUser: pairedUserReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware(); // Thunk middleware is included by default
  },
});

export type RootState = ReturnType<typeof store.getState>; // Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch; // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export default store; // use in index.tsx
