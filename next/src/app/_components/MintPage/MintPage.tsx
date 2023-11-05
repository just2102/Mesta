"use client";

import { Box } from "@mui/material";
import MintButton from "./MintButton/MintButton";
import { CurrentCollection } from "./CurrentCollection/CurrentCollection";
import styles from "./MintPage.module.scss";
import Loading from "~/app/loading";
import { ConnectWalletCta } from "../ConnectWalletCta/ConnectWalletCta";
import { useCurrentCollectionData } from "~/app/api/web3/hooks/read/useCurrentCollectionData";
import { useNetwork } from "wagmi";

export function MintPage() {
  const { chain } = useNetwork();
  const { collectionData, error, isError, isLoading } =
    useCurrentCollectionData();

  const shouldDisplayConnectWalletCta =
    !collectionData || isError || chain?.unsupported;
  const shouldDisplayCurrentCollection =
    collectionData && !error && !isLoading && !chain?.unsupported;

  return (
    <Box className={styles.mintPage}>
      {isLoading && <Loading />}
      {shouldDisplayConnectWalletCta && <ConnectWalletCta />}
      {shouldDisplayCurrentCollection && (
        <>
          <CurrentCollection collectionData={collectionData} />
          <MintButton collectionAddress={collectionData.collectionAddress} />
        </>
      )}
    </Box>
  );
}
