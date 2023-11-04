"use client";

import { mestaCollectionAbi } from "../../abi/MestaCollection";
import { useContractRead } from "wagmi";

export const useCollectionUri = (collectionAddress: string | undefined) => {
  const { data, isError, isLoading } = useContractRead({
    address: collectionAddress as `0x${string}`,
    abi: mestaCollectionAbi,
    functionName: "_baseTokenURI",
  });
  if (!collectionAddress) return;
  return data;
};
