"use client";

import { MestaNetworksMap } from "../const/Addresses";
import { mestaAbi } from "../abi/Mesta";
import { mestaCollectionAbi } from "../abi/MestaCollection";
import { fetchIpfsImage } from "../../ipfs/fetchIpfsImage";
import { type CollectionData } from "../types/Collection";
import { type Chain } from "viem";
import { config, getClient } from "~/config";

export async function readCurrentCollectionData(chain: Chain) {
  const mestaAddress = MestaNetworksMap.get(chain.id);
  if (!mestaAddress)
    throw new Error(`Mesta address not found for chain ${chain.id}`);

  const client = getClient(chain);

  config.getClient().chain;

  const currentCollectionAddress = await client.readContract({
    functionName: "currentCollection",
    address: mestaAddress,
    abi: mestaAbi,
  });

  const [coverDirectURI, description, name, maxSupply, totalSupply] =
    await Promise.all([
      client.readContract({
        functionName: "coverDirectURI",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      client.readContract({
        functionName: "description",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      client.readContract({
        functionName: "name",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      client.readContract({
        functionName: "max_supply",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      client.readContract({
        functionName: "totalSupply",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
    ]);

  const coverAsImageUri = coverDirectURI;

  const coverAsImage = coverAsImageUri
    ? await fetchIpfsImage(coverAsImageUri)
    : null;

  const newCollectionData: CollectionData = {
    coverAsImage,
    description,
    name,
    maxSupply: Number(maxSupply),
    totalSupply: Number(totalSupply),
    collectionAddress: currentCollectionAddress,
  };

  return newCollectionData;
}
