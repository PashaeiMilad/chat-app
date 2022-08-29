import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import { api } from '../services/authenticationService'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const makeStore = () => store
  

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper<AppStore>(makeStore);