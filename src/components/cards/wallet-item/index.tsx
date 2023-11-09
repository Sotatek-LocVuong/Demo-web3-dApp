import { Card, Space } from 'antd';
import { IWalletItemProps } from '../../../models';
import styles from './style.module.css';

export const WalletItem: React.FC<IWalletItemProps> = ({
  icon,
  walletName,
  handleConnectWallet
}) => {
  return (
    <Card
      hoverable
      className={styles.cardContainer}
      onClick={() => handleConnectWallet(walletName)}
    >
      <img style={{ height: 160, width: 160 }} src={icon} alt={walletName} />
      <Space
        style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}
      >
        {walletName}
      </Space>
    </Card>
  );
};
