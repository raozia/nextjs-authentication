import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: counterReducer,
        },
    });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
