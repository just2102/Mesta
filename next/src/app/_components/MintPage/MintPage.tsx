"use client";

export const dynamic = "force-dynamic";

import { Box } from "@mui/material";
import { CurrentCollection } from "./CurrentCollection/CurrentCollection";
import styles from "./MintPage.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { MestaNetworksMap } from "~/app/api/web3/const/Addresses";
import { mestaAbi } from "~/app/api/web3/abi/Mesta";
import { readCurrentCollectionData } from "~/app/api/web3/actions/readCurrentCollectionData";
import { type CollectionData } from "~/app/api/web3/types/Collection";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "~/config";
import { useRouter } from "next/navigation";

export function MintPage() {
  const router = useRouter();
  const { chain, address } = useAccount();
  const {
    writeContractAsync,
    isSuccess: mintedSuccess,
    isError: mintedError,
    isLoading: isSendingMintTx,
  } = useWriteContract();

  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );

  const [mintTx, setMintTx] = useState<`0x${string}` | undefined>(undefined);

  const handleMint = async () => {
    if (!collectionData?.collectionAddress) {
      return;
    }
    if (!address) {
      return;
    }

    const mestaAddress: string | undefined = MestaNetworksMap.get(
      chain?.id ?? 11155111
    );

    const mintTx = await writeContractAsync({
      address: mestaAddress! as `0x${string}`,
      abi: mestaAbi,
      functionName: "mintToken",
      args: [collectionData.collectionAddress, address],
    });

    setMintTx(mintTx);
  };

  const shouldDisplayCurrentCollection = collectionData !== null;

  const fetchCollectionData = useCallback(async () => {
    if (!chain) return;

    const _collectionData = await readCurrentCollectionData(chain);
    setCollectionData(_collectionData);
  }, [chain]);

  useEffect(() => {
    void fetchCollectionData();
  }, [chain, fetchCollectionData]);

  useEffect(() => {
    const waitForReceipt = async () => {
      if (!mintTx) return;

      const receipt = await waitForTransactionReceipt(config, {
        hash: mintTx,
        confirmations: 1,
      });

      if (receipt.status === "success") {
        void router.refresh();
      }
    };

    void waitForReceipt();
  }, [mintTx, router]);

  return (
    <Box className={styles.mintPage}>
      {shouldDisplayCurrentCollection && (
        <>
          <CurrentCollection
            collectionData={collectionData}
            mint={handleMint}
            isSendingMintTx={isSendingMintTx}
            mintTx={mintTx}
            mintingNftId={collectionData.totalSupply + 1}
          />
        </>
      )}
    </Box>
  );
}
