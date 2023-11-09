import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConnectorKeys } from '../../web3/connectors';

type WalletStates = {
  walletName: ConnectorKeys | null;
  balance: string | null;
  userAddress: string | null;
};

const initialState: WalletStates = {
  walletName: null,
  balance: null,
  userAddress: null
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<ConnectorKeys | null>) => {
      state.walletName = action.payload;
    },
    resetWallet: (state) => {
      state.walletName = null;
    },
    setBalance: (state, action: PayloadAction<string | null>) => {
      state.balance = action.payload;
    },
    resetBalance: (state) => {
      state.balance = null;
    },
    setUserAddress: (state, action: PayloadAction<string | null>) => {
      state.userAddress = action.payload;
    },
    resetUserAddress: (state) => {
      state.userAddress = null;
    }
  }
});

export const walletActions = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
