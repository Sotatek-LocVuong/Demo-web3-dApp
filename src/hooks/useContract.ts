import { useWeb3React } from '@web3-react/core';
import { Contract, InterfaceAbi, ethers } from 'ethers';
import { useMemo } from 'react';

type UseContractParams = {
  abi: InterfaceAbi;
  contractAddress: string;
};

export const useContract = ({ abi, contractAddress }: UseContractParams) => {
  const { provider } = useWeb3React();

  const contract = useMemo(() => {
    if (!ethers.isAddress(contractAddress)) {
      return null;
    }

    return new Contract(contractAddress, abi, provider?.getSigner() as any);
  }, [abi, contractAddress, provider]);
  return contract;
};
