"use client";

import { mestaAbi } from "../../abi/Mesta";
import { mestaCollectionAbi } from "../../abi/MestaCollection";
import { useReadContract, useReadContracts } from "wagmi";
import { MestaNetworksMap } from "../../const/Addresses";
import { type CollectionData } from "../../types/Collection";
import { fetchIpfsImage } from "../../../ipfs/fetchIpfsImage";
import { useEffect, useState } from "react";
import { type Chain } from "wagmi/chains";

export const useCurrentCollectionData = (chain: Chain | undefined) => {
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
  } = useReadContract({
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
    {
      address: currentCollectionAddress!,
      abi: mestaCollectionAbi,
      functionName: "_baseTokenURI",
      chainId: chain?.id,
    },
  ];
  const {
    data,
    isError: collectionDataIsError,
    isLoading: collectionDataLoading,
    error: collectionDataError,
    refetch,
  } = useReadContracts({
    contracts,
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
            collectionAddress: currentCollectionAddress,
          };

          console.log("newCollectionData", newCollectionData);

          setCollectionData(newCollectionData);
        } catch (fetchError) {
          console.error("Error fetching collection data:", fetchError);
        }
      }
    };

    void updateCollectionData();
  }, [data, currentCollectionAddress]);

  const isLoading = currentCollectionLoading || collectionDataLoading;
  const isError = currentCollectionIsError || collectionDataIsError;
  const error = currentCollectionError ?? collectionDataError;

  return { collectionData, error, isError, isLoading, refetch };
};
