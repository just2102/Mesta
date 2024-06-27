"use server";

import { readContract } from "viem/actions";
import { MestaNetworksMap } from "../const/Addresses";
import { type Chain } from "wagmi/chains";
import { getClient } from "~/config";
import { mestaAbi } from "../abi/Mesta";
import { mestaCollectionAbi } from "../abi/MestaCollection";
import { fetchIpfsImage } from "../../ipfs/fetchIpfsImage";
import { type CollectionData } from "../types/Collection";

export async function readCurrentCollectionData(chain: Chain) {
  const mestaAddress: string | undefined = MestaNetworksMap.get(
    chain?.id ?? 11155111
  );

  const client = getClient(chain);

  const currentCollectionAddress = await readContract(client, {
    functionName: "currentCollection",
    address: mestaAddress as `0x${string}`,
    abi: mestaAbi,
  });

  const [coverDirectURI, description, name, maxSupply, totalSupply] =
    await Promise.all([
      readContract(client, {
        functionName: "coverDirectURI",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      readContract(client, {
        functionName: "description",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      readContract(client, {
        functionName: "name",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      readContract(client, {
        functionName: "max_supply",
        address: currentCollectionAddress,
        abi: mestaCollectionAbi,
      }),
      readContract(client, {
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

  console.log("newCollectionData", newCollectionData);

  return newCollectionData;
}
