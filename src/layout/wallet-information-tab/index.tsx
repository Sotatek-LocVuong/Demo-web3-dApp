import React from 'react';
import { TokenBalanceType, TokenType } from '../../models';
import { Flex, Space } from 'antd';
import { LineWithTitle } from '../../components';

interface IProps {
  address: string;
  balances: TokenBalanceType[];
}

const WalletInformation: React.FC<IProps> = ({ address, balances }: IProps) => {
  console.log(balances);
  return (
    <Flex vertical justify="center" align="start" gap={10}>
      <Space>Its Wallet Information Tab!</Space>
      <LineWithTitle title="Wallet Address" content={address} />
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
    </Flex>
  );
};

export default WalletInformation;
