import { Flex, Space } from 'antd';
import React from 'react';
import { LineWithTitle } from '../../components';
import { TokenBalanceType, TokenType } from '../../models';

interface IProps {
  walletAddress: string | null;
  balances: TokenBalanceType[];
}

const WalletInformation: React.FC<IProps> = ({
  walletAddress = '',
  balances
}: IProps) => {
  return (
    <Flex vertical justify="center" align="start" gap={10}>
      <h3>Wallet Information</h3>
      {!walletAddress && !balances.length ? (
        <Space>Please connect to a wallet first!</Space>
      ) : (
        <>
          <LineWithTitle title="Wallet Address" content={walletAddress || ''} />
          {balances.map((tokenInfo) => {
            const title =
              tokenInfo.type === TokenType.Native
                ? 'Default Balance'
                : 'Custom Token Balance';

            return (
              <LineWithTitle
                key={tokenInfo.tokenName}
                title={title}
                note={tokenInfo.tokenName}
                content={tokenInfo.balance}
              />
            );
          })}
        </>
      )}
    </Flex>
  );
};

export default WalletInformation;
