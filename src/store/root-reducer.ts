import { combineReducers } from '@reduxjs/toolkit';
import { walletReducer } from './slides';

const appReducer = combineReducers({
  wallet: walletReducer
});

export const rootReducer = (state: any, action: any) =>
  appReducer(state, action);
