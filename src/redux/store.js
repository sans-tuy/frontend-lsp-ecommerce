import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slice';

export default configureStore({
  reducer: { global: globalReducer },
});
