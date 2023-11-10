import { useWeb3React } from '@web3-react/core';
import { Contract, ContractInterface, ethers } from 'ethers';
import { useMemo } from 'react';

type UseContractParams = {
  abi: ContractInterface;
  contractAddress: string;
};

export const useContract = ({ abi, contractAddress }: UseContractParams) => {
  const { provider } = useWeb3React();

  const contract = useMemo(() => {
    if (!ethers.utils.isAddress(contractAddress)) {
      return null;
    }

    return new Contract(contractAddress, abi, provider?.getSigner());
  }, [abi, contractAddress, provider]);
  return contract;
};
