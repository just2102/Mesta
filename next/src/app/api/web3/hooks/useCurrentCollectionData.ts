"use client";

import { mestaAbi } from "../abi/Mesta";
import { mestaCollectionAbi } from "../abi/MestaCollection";
import { useContractRead, useContractReads } from "wagmi";
import { useNetwork } from "wagmi";
import { MestaNetworksMap } from "../const/Addresses";
import { type CollectionData } from "../types/Collection";
import { fetchIpfsImage } from "../../ipfs/fetchIpfsImage";
import { useEffect, useState } from "react";

export const useCurrentCollectionData = () => {
  const { chain } = useNetwork();
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );
  const mestaAddress: string | undefined = MestaNetworksMap.get(
    chain?.id ?? 11155111
  );
  const {
    data: currentCollectionAddress,
    isError: currentCollectionIsError,
    isLoading: currentCollectionLoading,
    error: currentCollectionError,
  } = useContractRead({
    address: mestaAddress as `0x${string}`,
    abi: mestaAbi,
    functionName: "currentCollection",
    chainId: chain?.id,
  });
  const contracts = [
    {
      address: currentCollectionAddress!,
      abi: mestaCollectionAbi,
      functionName: "coverDirectURI",
      chainId: chain?.id,
    },
    {
      address: currentCollectionAddress!,
      abi: mestaCollectionAbi,
      functionName: "description",
      chainId: chain?.id,
    },
    {
      address: currentCollectionAddress!,
      abi: mestaCollectionAbi,
      functionName: "name",
      chainId: chain?.id,
    },
    {
      address: currentCollectionAddress!,
      abi: mestaCollectionAbi,
      functionName: "max_supply",
      chainId: chain?.id,
    },
    {
      address: currentCollectionAddress!,
      abi: mestaCollectionAbi,
      functionName: "totalSupply",
      chainId: chain?.id,
    },
  ];
  const {
    data,
    isError: collectionDataIsError,
    isLoading: collectionDataLoading,
    error: collectionDataError,
  } = useContractReads({
    contracts,
    enabled: contracts.length > 0,
  });
  useEffect(() => {
    const updateCollectionData = async () => {
      if (data) {
        try {
          const coverAsImageUri = data[0]?.result as string;
          const coverAsImage = coverAsImageUri
            ? await fetchIpfsImage(coverAsImageUri)
            : null;

          const newCollectionData: CollectionData = {
            coverAsImage,
            description: data[1]?.result as string,
            name: data[2]?.result as string,
            maxSupply: Number(data[3]?.result),
            totalSupply: Number(data[4]?.result),
          };

          setCollectionData(newCollectionData);
        } catch (fetchError) {
          console.error("Error fetching IPFS image:", fetchError);
        }
      }
    };

    void updateCollectionData();
  }, [data]);

  const isLoading = currentCollectionLoading || collectionDataLoading;
  const isError = currentCollectionIsError || collectionDataIsError;
  const error = currentCollectionError ?? collectionDataError;
  return { collectionData, error, isError, isLoading };
};
