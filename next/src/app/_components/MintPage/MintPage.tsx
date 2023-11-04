"use client";

import { Box } from "@mui/material";
import MintButton from "./MintButton/MintButton";
import { CurrentCollection } from "./CurrentCollection/CurrentCollection";
import styles from "./MintPage.module.scss";
import Loading from "~/app/loading";
import { ConnectWalletCta } from "../ConnectWalletCta/ConnectWalletCta";
import { useCurrentCollectionData } from "~/app/api/web3/hooks/read/useCurrentCollectionData";

export function MintPage() {
  const { collectionData, error, isError, isLoading } =
    useCurrentCollectionData();

  return (
    <Box className={styles.mintPage}>
      {isLoading && <Loading />}
      {isError && <ConnectWalletCta />}
      {collectionData && (
        <>
          <CurrentCollection collectionData={collectionData} />
          <MintButton collectionAddress={collectionData.collectionAddress} />
        </>
      )}
    </Box>
  );
}
