import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice'
import shopsReducer from '../features/shops/shopsSlice'
import offersReducer from '../features/offers/offersSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    shops: shopsReducer,
    offers: offersReducer,
  },

  
});
