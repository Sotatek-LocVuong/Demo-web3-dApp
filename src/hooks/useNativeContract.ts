import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { isAddress } from 'web3-validator';
import { useAppDispatch } from '../store';
import { walletActions } from '../store/slides';
import { formatBalance } from '../utils';
import { REACT_APP_BSC_DECIMAL } from '../web3/constants';

export const useNativeContract = () => {
  const { account, provider, isActive } = useWeb3React();
  const dispatch = useAppDispatch();

  // const appContract = useContract({
  //   abi: BEP20Abi,
  //   contractAddress: REACT_APP_BSC_TESTNET_CONTRACT_ADDRESS ?? ''
  // });

  const getTokenBalance = async () => {
    const rawBalance = await provider?.getBalance(account || '');
    const balanceInWei = new BigNumber((rawBalance ?? 0)?.toString());

    const formattedBalance = formatBalance(
      balanceInWei,
      REACT_APP_BSC_DECIMAL ?? 18
    );
    dispatch(walletActions.setBalance(formattedBalance));
  };

  const sendNativeTransaction = async (toAddress: string, amount: string) => {
    try {
      if (isActive && account && isAddress(toAddress)) {
        const transaction = {
          from: account,
          to: toAddress,
          value: amount,
          // gas: '21000',
          gasPrice: await provider?.getGasPrice()
        };

        const signer = provider?.getSigner();
        const receipt = await signer?.sendTransaction(transaction);
        console.log('receipt, ', receipt);
        return receipt;
      } else {
        console.error('Web3 not connected or account not selected.');
        return undefined;
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      return undefined;
    }
  };

  return {
    getTokenBalance,
    sendNativeTransaction
  };
};
