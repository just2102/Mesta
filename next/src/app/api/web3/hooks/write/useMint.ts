import { useAccount, useContractWrite, useNetwork } from "wagmi";
import { mestaAbi } from "../../abi/Mesta";
import { MestaNetworksMap } from "../../const/Addresses";

export const useMint = (collectionAddress: `0x${string}` | undefined) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const mestaAddress: string | undefined = MestaNetworksMap.get(
    chain?.id ?? 11155111
  );

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: mestaAddress! as `0x${string}`,
      abi: mestaAbi,
      functionName: "mintToken",
      args: [collectionAddress!, address!], // potential errors here
    });

  return { data, isLoading, isSuccess, isError, error, write };
};
