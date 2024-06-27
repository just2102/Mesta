"use client";

import { type CollectionData } from "~/app/api/web3/types/Collection";
import { NftBox } from "./NftBox/NftBox";
import { Box } from "@mui/material";
import styles from "./MintedAndToMintNfts.module.scss";

interface Props {
  collectionData: CollectionData;

  mintTx: `0x${string}` | undefined;
  mintingNftId: number;
}

export function MintedAndToMintNfts({
  collectionData,
  mintTx,
  mintingNftId,
}: Props) {
  const numOfNftsMinted = collectionData.totalSupply;
  const totalNumOfNftsInCollection = collectionData.maxSupply;

  const boxesToDisplay =
    totalNumOfNftsInCollection > 0
      ? Array.from(Array(totalNumOfNftsInCollection).keys()).map((i) => (
          <NftBox
            nftId={i + 1}
            isMinted={i + 1 <= numOfNftsMinted}
            collectionAddress={collectionData.collectionAddress!}
            key={i}
            mintTx={mintTx}
            mintingNftId={mintingNftId}
          />
        ))
      : null;
  return <Box className={styles.mintedAndToMintNfts}>{boxesToDisplay}</Box>;
}
