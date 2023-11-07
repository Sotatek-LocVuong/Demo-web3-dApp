import React from 'react';

interface IProps {}

const WalletInformation: React.FC<IProps> = (props: IProps) => {
  console.log(props);
  return <>Its Wallet Information Tab!</>;
};

export default WalletInformation;
