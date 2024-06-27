"use server";

import { type IpfsJson } from "./ipfsFetcher.type";

export const fetchIpfsJSON = async (ipfsUri: string): Promise<IpfsJson> => {
  const clientId = process.env.THIRDWEB_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing THIRDWEB_CLIENT_ID");
  }
  const ipfsGateway = `https://${clientId}.ipfscdn.io/ipfs/`;
  const ipfsHash = ipfsUri.split("ipfs://")[1];
  const url = `${ipfsGateway}${ipfsHash}`;

  try {
    const response = await fetch(url, {
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as IpfsJson;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
