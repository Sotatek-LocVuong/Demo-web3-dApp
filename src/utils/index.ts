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
