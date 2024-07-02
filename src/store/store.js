import { configureStore } from '@reduxjs/toolkit';
import tabReducer from '../state/tabSlice';
import metaMaskSliceReducer from '../state/metaMaskSlice';
import userReducer from '../state/userSlice';

const store = configureStore({
  reducer: {
    tab: tabReducer,
    metamask: metaMaskSliceReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;