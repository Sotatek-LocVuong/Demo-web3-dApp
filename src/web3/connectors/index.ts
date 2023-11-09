import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect-v2';
import { metaMask, metaMaskHooks } from './metaMask';
import { walletConnect, walletConnectHooks } from './walletConnect';

export enum ConnectorKeys {
  appMetaMask = 'MetaMask',
  appWalletConnect = 'WalletConnect'
}

export const connectors = {
  [ConnectorKeys.appMetaMask]: metaMask,
  [ConnectorKeys.appWalletConnect]: walletConnect
};

export const appConnectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks]
];
