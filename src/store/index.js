import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import newsletterReducer from './newsletterSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    newsletter: newsletterReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const dispatch = store.dispatch;
export default store;
