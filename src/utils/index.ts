import BigNumber from 'bignumber.js';

export const detectCurrentProvider = () => {
  let provider;

  const ethereum = (window as any)?.ethereum;
  const web3 = (window as any)?.web3;

  if (ethereum) {
    provider = ethereum;
  } else if (web3) {
    provider = web3?.currentProvider;
  } else {
    console.log('Non-ethereum browser detected. You should install Metamask');
  }

  return provider;
};

export const formatBalance = (
  balanceInWei: BigNumber,
  decimal: string | number
) => {
  const balanceInEther = balanceInWei.dividedBy(
    new BigNumber(10).exponentiatedBy(Number(decimal))
  );

  return balanceInEther.toFormat();
};
