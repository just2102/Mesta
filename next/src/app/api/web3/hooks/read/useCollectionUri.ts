"use client";

import { mestaCollectionAbi } from "../../abi/MestaCollection";
import { useReadContract } from "wagmi";

export const useCollectionUri = (collectionAddress: string | undefined) => {
  const { data, isError, isLoading } = useReadContract({
    address: collectionAddress as `0x${string}`,
    abi: mestaCollectionAbi,
    functionName: "_baseTokenURI",
  });
  if (!collectionAddress) return;
  return data;
};
