"use client";

import { Box } from "@mui/material";
import { CurrentCollection } from "./CurrentCollection/CurrentCollection";
import styles from "./MintPage.module.scss";
import Loading from "~/app/loading";
import { ConnectWalletCta } from "../ConnectWalletCta/ConnectWalletCta";
import { useCurrentCollectionData } from "~/app/api/web3/hooks/read/useCurrentCollectionData";
import { useNetwork } from "wagmi";
import { useMint } from "~/app/api/web3/hooks/write/useMint";
import { useEffect } from "react";

export function MintPage() {
  const { chain } = useNetwork();
  const { collectionData, error, isError, isLoading, refetch } =
    useCurrentCollectionData();

  const {
    actualMintData,
    isSendingMintTx,
    isWaitingMint,
    mintedSuccess,
    write: writeMint,
  } = useMint(collectionData?.collectionAddress);

  const shouldDisplayConnectWalletCta =
    !collectionData || isError || chain?.unsupported;
  const shouldDisplayCurrentCollection =
    collectionData && !error && !isLoading && !chain?.unsupported;

  useEffect(() => {
    if (mintedSuccess) {
      void refetch();
    }
  }, [mintedSuccess, refetch]);

  return (
    <Box className={styles.mintPage}>
      {isLoading && <Loading />}
      {shouldDisplayConnectWalletCta && <ConnectWalletCta />}
      {shouldDisplayCurrentCollection && (
        <>
          <CurrentCollection
            collectionData={collectionData}
            mint={writeMint}
            isSendingMintTx={isSendingMintTx}
            isWaitingMint={isWaitingMint}
          />
        </>
      )}
    </Box>
  );
}
