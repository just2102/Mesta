"use server";

export const fetchIpfsImage = async (ipfsUri: string): Promise<string> => {
  const clientId = process.env.THIRDWEB_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing THIRDWEB_CLIENT_ID");
  }
  const ipfsGateway = `https://${clientId}.ipfscdn.io/ipfs/`;
  const ipfsHash = ipfsUri.split("ipfs://")[1];
  const url = `${ipfsGateway}${ipfsHash}`;

  try {
    console.log("trying to fetch: ", url);
    const response = await fetch(url, {
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.url;
  } catch (error) {
    console.error("Error fetching IPFS Image:", error);
    throw error;
  }
};
