import { Modal } from 'antd';
import { IConnectWalletModal } from '../../../models';
import { WalletItem } from '../../cards/wallet-item';
import styles from './style.module.css';
import { ConnectorKeys } from '../../../web3/connectors';
import { useWalletConnection } from '../../../hooks/useConnectWallet';

export const ConnectWalletModal: React.FC<IConnectWalletModal> = ({
  wallets,
  isOpened,
  onClose,
  ...otherProps
}) => {
  const { connectToWallet } = useWalletConnection();

  const handleConnectWallet = async (connectorKey: ConnectorKeys) => {
    onClose();
    await connectToWallet(connectorKey);
  };

  return (
    <Modal open={isOpened} onCancel={onClose} footer={null} {...otherProps}>
      <div className={styles.wrapper}>
        {wallets.map((walletInfo, idx) => (
          <WalletItem
            key={idx}
            icon={walletInfo.icon}
            walletName={walletInfo.walletName}
            handleConnectWallet={handleConnectWallet}
          />
        ))}
      </div>
    </Modal>
  );
};
