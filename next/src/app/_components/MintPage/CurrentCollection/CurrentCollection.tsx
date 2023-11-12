"use client";

import { Box, Typography } from "@mui/material";
import styles from "./CurrentCollection.module.scss";
import { type CollectionData } from "~/app/api/web3/types/Collection";
import { MintedAndToMintNfts } from "./MintedAndToMintNfts/MintedAndToMintNfts";
import MintButton from "../MintButton/MintButton";

interface Props {
  collectionData: CollectionData | null;
  mint: () => void;
  isSendingMintTx: boolean;
  isWaitingMint: boolean;
}

export function CurrentCollection({
  collectionData,
  mint,
  isSendingMintTx,
  isWaitingMint,
}: Props) {
  if (!collectionData) return null;
  const { coverAsImage } = collectionData;
  return (
    <Box className={styles.currentCollection}>
      <Box className={styles.currentCollectionInfo}>
        <Typography
          className={styles.currentCollection_generalTitle}
          variant="h4"
        >
          Current collection
        </Typography>
        <Typography className={styles.currentCollection_title} variant="h5">
          {collectionData.name}
        </Typography>
        {coverAsImage && (
          <img
            className={styles.currentCollection_image}
            src={coverAsImage}
            alt="Current NFT collection image"
          />
        )}
        <Typography
          className={styles.currentCollection_description}
          variant="body1"
        >
          {collectionData.description}
        </Typography>

        <MintButton
          mint={mint}
          isSendingMintTx={isSendingMintTx}
          isWaitingMint={isWaitingMint}
        />
      </Box>

      {collectionData && (
        <MintedAndToMintNfts
          isWaitingMint={isWaitingMint}
          collectionData={collectionData}
        />
      )}
    </Box>
  );
}
