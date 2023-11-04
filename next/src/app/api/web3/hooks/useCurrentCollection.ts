"use client";

import { mestaAbi } from "../abi/Mesta";
import { useContractRead } from "wagmi";
import { useNetwork } from "wagmi";
import { MestaNetworksMap } from "../const/Addresses";

export const useCurrentCollection = () => {
  const { chain } = useNetwork();
  const mestaAddress: string | undefined = MestaNetworksMap.get(
    chain?.id ?? 11155111
  );
  const { data, isError, isLoading, error } = useContractRead({
    address: mestaAddress as `0x${string}`,
    abi: mestaAbi,
    functionName: "currentCollection",
    chainId: chain?.id,
  });
  return { data, isError, isLoading, error };
};
