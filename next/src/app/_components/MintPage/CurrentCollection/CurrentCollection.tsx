"use client";

import { Box, Typography } from "@mui/material";
import styles from "./CurrentCollection.module.scss";
import { type CollectionData } from "~/app/api/web3/types/Collection";

interface Props {
  collectionData: CollectionData | null;
}

export function CurrentCollection({ collectionData }: Props) {
  if (!collectionData) return null;
  const { coverAsImage } = collectionData;
  return (
    <Box className={styles.currentCollection}>
      <Typography variant="h4">Current collection</Typography>
      <Typography variant="h5">{collectionData.name}</Typography>
      {coverAsImage && (
        <img src={coverAsImage} alt="Current NFT collection image" />
      )}
      <Typography variant="body1">{collectionData.description}</Typography>
    </Box>
  );
}
