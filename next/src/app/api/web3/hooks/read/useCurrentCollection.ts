"use client";

import { mestaAbi } from "../../abi/Mesta";
import { useAccount, useReadContract } from "wagmi";
import { MestaNetworksMap } from "../../const/Addresses";

export const useCurrentCollection = () => {
  const { chain } = useAccount();
  const mestaAddress: string | undefined = MestaNetworksMap.get(
    chain?.id ?? 11155111
  );
  const { data, isError, isLoading, error } = useReadContract({
    address: mestaAddress as `0x${string}`,
    abi: mestaAbi,
    functionName: "currentCollection",
    chainId: chain?.id,
  });
  return { data, isError, isLoading, error };
};
