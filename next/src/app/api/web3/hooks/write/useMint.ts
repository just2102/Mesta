import {
  useAccount,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { mestaAbi } from "../../abi/Mesta";
import { MestaNetworksMap } from "../../const/Addresses";

export const useMint = (collectionAddress: `0x${string}` | undefined) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const mestaAddress: string | undefined = MestaNetworksMap.get(
    chain?.id ?? 11155111
  );

  const {
    data: sentMintTxData,
    isLoading: isSendingMintTx,
    isSuccess,
    isError,
    error,
    write,
  } = useContractWrite({
    address: mestaAddress! as `0x${string}`,
    abi: mestaAbi,
    functionName: "mintToken",
    args: [collectionAddress!, address!], // potential errors here
  });

  const {
    data: actualMintData,
    isLoading: isWaitingMint,
    isSuccess: mintedSuccess,
  } = useWaitForTransaction({
    hash: sentMintTxData?.hash,
  });

  return {
    actualMintData,
    isSendingMintTx,
    isWaitingMint,
    mintedSuccess,
    isError,
    error,
    write,
  };
};
