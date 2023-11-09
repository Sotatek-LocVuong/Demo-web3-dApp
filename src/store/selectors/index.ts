import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const getWalletName = createSelector(
  (state: RootState) => state.wallet.walletName,
  (walletName) => walletName
);

export const getBalance = createSelector(
  (state: RootState) => state.wallet.balance,
  (balance) => balance
);

export const getUserAddress = createSelector(
  (state: RootState) => state.wallet.userAddress,
  (userAddress) => userAddress
);
