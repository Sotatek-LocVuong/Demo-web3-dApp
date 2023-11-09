import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useAppDispatch } from '../store';
import { walletActions } from '../store/slides';
import { REACT_APP_BSC_DECIMAL } from '../web3/constants';

export const useNativeContract = () => {
  const { account, provider } = useWeb3React();
  const dispatch = useAppDispatch();

  // const getTokenBalance = async (wallet?: ConnectorKeys) => {
  const getTokenBalance = async () => {
    const rawBalance = await provider?.getBalance(account || '');
    const balanceInWei = new BigNumber((rawBalance ?? 0)?.toString());
    const balanceInEther = balanceInWei.dividedBy(
      new BigNumber(10).exponentiatedBy(Number(REACT_APP_BSC_DECIMAL))
    );

    const formattedBalance = balanceInEther.toFormat();
    dispatch(walletActions.setBalance(formattedBalance));
  };

  return {
    getTokenBalance
  };
};
