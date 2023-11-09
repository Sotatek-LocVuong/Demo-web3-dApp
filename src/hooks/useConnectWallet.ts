import { useCallback } from 'react';
import { ConnectorKeys, connectors } from '../web3/connectors';
import {
  REACT_APP_BLOCK_EXPLORER_URL,
  REACT_APP_BSC_TESTNET_CHAIN_ID,
  REACT_APP_BSC_TESTNET_RPC_URL,
  REACT_APP_NETWORK_NAME
} from '../web3/constants';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '../store';
import { walletActions } from '../store/slides';

export const useWalletConnection = () => {
  const { connector: appConnector } = useWeb3React();
  const dispatch = useAppDispatch();

  const connectToWallet = useCallback(
    async (connectorKey: ConnectorKeys) => {
      try {
        const connector = connectors[connectorKey];
        // Just use BSC testnet chainId for this project
        const chainId = parseInt(REACT_APP_BSC_TESTNET_CHAIN_ID as string, 10);
        const addEthereumChainParameter = {
          chainId,
          chainName: REACT_APP_NETWORK_NAME,
          nativeCurrency: {
            name: 'BNB',
            symbol: 'bnb',
            decimals: 18
          },
          rpcUrls: [REACT_APP_BSC_TESTNET_RPC_URL],
          blockExplorerUrls: [REACT_APP_BLOCK_EXPLORER_URL]
        } as any;

        const option =
          connectorKey === ConnectorKeys.appMetaMask
            ? addEthereumChainParameter
            : chainId;

        await connector.activate(option);

        dispatch(walletActions.setWallet(connectorKey));
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    [dispatch]
  );

  const disconnectWallet = (connector: typeof appConnector) => {
    connector?.deactivate?.();
    dispatch(walletActions.resetWallet());
  };

  return { connectToWallet, disconnectWallet };
};
