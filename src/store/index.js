import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import newsletterReducer from './newsletterSlice';
import authReducer from './authSlice';
import testimonialsReducer from './testimonialsSlice';
import careersReducer from './careersSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    newsletter: newsletterReducer,
    auth: authReducer,
    testimonials: testimonialsReducer,
    careers: careersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const dispatch = store.dispatch;
export default store;
