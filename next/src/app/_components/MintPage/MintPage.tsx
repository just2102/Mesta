"use client";

export const dynamic = "force-dynamic";

import { Box } from "@mui/material";
import { CurrentCollection } from "./CurrentCollection/CurrentCollection";
import styles from "./MintPage.module.scss";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { MestaNetworksMap } from "~/app/api/web3/const/Addresses";
import { mestaAbi } from "~/app/api/web3/abi/Mesta";
import { readCurrentCollectionData } from "~/app/api/web3/actions/readCurrentCollectionData";
import { type CollectionData } from "~/app/api/web3/types/Collection";

export function MintPage() {
  const { chain, address } = useAccount();
  const {
    writeContract,
    data: actualMintData,
    isSuccess: mintedSuccess,
    isError: mintedError,
    isLoading: isSendingMintTx,
  } = useWriteContract();

  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );

  const [isWaitingMint, setIsWaitingMint] = useState(false);

  const handleMint = () => {
    if (!collectionData?.collectionAddress) {
      return;
    }
    if (!address) {
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

  const shouldDisplayCurrentCollection = collectionData !== null;

  useEffect(() => {
    const fetchasd = async () => {
      if (!chain) return;

      const _collectionData = await readCurrentCollectionData(chain);
      setCollectionData(_collectionData);
    };

    void fetchasd();
  }, [chain]);

  return (
    <Box className={styles.mintPage}>
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
