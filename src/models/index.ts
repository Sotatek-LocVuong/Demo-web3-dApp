import { ModalProps } from 'antd';
import { ConnectorKeys } from '../web3/connectors';

export type TokenBalanceType = {
  type: string;
  tokenName: string;
  balance: string;
};

export enum TabNames {
  WalletInfo = 1,
  InteractiveForm = 2
}

export enum TokenType {
  Native = 'Native',
  Other = 'Other'
}

export type TransactionFormFieldsType = {
  address: string;
  amount: number;
};

export interface IWalletInfo {
  icon: string;
  walletName: ConnectorKeys;
}

export interface IWalletItemProps extends IWalletInfo {
  handleConnectWallet: (connectorKey: ConnectorKeys) => void;
}

export interface IConnectWalletModal extends ModalProps {
  isOpened: boolean;
  wallets: IWalletInfo[];
  onClose: () => void;
}
