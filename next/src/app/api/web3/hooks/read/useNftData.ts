"use client";

import { useReadContract } from "wagmi";
import { mestaCollectionAbi } from "../../abi/MestaCollection";
import { useEffect, useState } from "react";
import { fetchIpfsImage } from "~/app/api/ipfs/fetchIpfsImage";
import { fetchIpfsJSON } from "~/app/api/ipfs/fetchIpfsJSON";

export const useNftData = (
  nftId: number,
  collectionAddress: string,
  isMinted: boolean
) => {
  const [nftImage, setNftImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { data: tokenUriData, isSuccess } = useReadContract({
    address: collectionAddress as `0x${string}`,
    abi: mestaCollectionAbi,
    functionName: "tokenURI",
    args: [BigInt(nftId)],
  });

  useEffect(() => {
    const fetchNftData = async () => {
      if (isMinted && isSuccess && tokenUriData) {
        setIsLoading(true);
        try {
          const ipfsJson = await fetchIpfsJSON(tokenUriData);
          const imageUrl = await fetchIpfsImage(ipfsJson.image);
          setNftImage(imageUrl);
        } catch (e) {
          console.error("Error fetching NFT data:", e);
          setError(e as Error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    void fetchNftData();
  }, [isMinted, isSuccess, tokenUriData]);

  return { nftImage, isLoading, error };
};
