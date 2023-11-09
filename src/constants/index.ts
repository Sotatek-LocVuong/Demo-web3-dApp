import { IWalletInfo } from '../models';
import { MetaMaskIcon, WalletConnectIcon } from '../assets';
import { ConnectorKeys } from '../web3/connectors';

export const WalletOptions: IWalletInfo[] = [
  {
    icon: MetaMaskIcon,
    walletName: ConnectorKeys.appMetaMask
  },
  {
    icon: WalletConnectIcon,
    walletName: ConnectorKeys.appWalletConnect
  }
];
