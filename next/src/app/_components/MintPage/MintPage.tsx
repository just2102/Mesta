"use client";

import { Box } from "@mui/material";
import { CurrentCollection } from "./CurrentCollection/CurrentCollection";
import styles from "./MintPage.module.scss";
import Loading from "~/app/loading";
import { useCurrentCollectionData } from "~/app/api/web3/hooks/read/useCurrentCollectionData";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { MestaNetworksMap } from "~/app/api/web3/const/Addresses";
import { mestaAbi } from "~/app/api/web3/abi/Mesta";

export function MintPage() {
  const { chain, address } = useAccount();
  const {
    writeContract,
    data: actualMintData,
    isSuccess: mintedSuccess,
    isError: mintedError,
    isLoading: isSendingMintTx,
  } = useWriteContract();
  const { collectionData, error, isError, isLoading, refetch } =
    useCurrentCollectionData(chain);

  const [isWaitingMint, setIsWaitingMint] = useState(false);

  const handleMint = () => {
    if (!collectionData?.collectionAddress) {
      console.error("Collection address is not defined");
      return;
    }
    if (!address) {
      console.error("Address is not defined");
      return;
    }

    const mestaAddress: string | undefined = MestaNetworksMap.get(
      chain?.id ?? 11155111
    );

    writeContract({
      address: mestaAddress! as `0x${string}`,
      abi: mestaAbi,
      functionName: "mintToken",
      args: [collectionData.collectionAddress, address],
    });
  };

  const shouldDisplayCurrentCollection =
    collectionData && !isError && !isLoading;

  useEffect(() => {
    if (mintedSuccess) {
      // void refetch();
      console.log("refetch");
    }
  }, [mintedSuccess]);

  return (
    <Box className={styles.mintPage}>
      {isLoading && <Loading />}
      {shouldDisplayCurrentCollection && (
        <>
          <CurrentCollection
            collectionData={collectionData}
            mint={handleMint}
            isSendingMintTx={isSendingMintTx}
            isWaitingMint={isWaitingMint}
          />
        </>
      )}
    </Box>
  );
}
