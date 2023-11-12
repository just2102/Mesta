import Image from "next/image";
import { useNftData } from "~/app/api/web3/hooks/read/useNftData";

import styles from "./NftBox.module.scss";
import { CircularProgress } from "@mui/material";
import { ToBeMintedNft } from "./ToBeMintedNft";
import { MintedNft } from "./MintedNft";
import { IsWaitingMintNft } from "./IsWaitingMintNft";

interface Props {
  nftId: number;
  collectionAddress: string;
  isMinted: boolean;
  isWaitingMint: boolean;
}
export function NftBox({
  nftId,
  collectionAddress,
  isMinted,
  isWaitingMint,
}: Props) {
  const { nftImage, error, isLoading } = useNftData(
    nftId,
    collectionAddress,
    isMinted
  );
  const shouldDisplayMintedNft = isMinted && !isWaitingMint && nftImage;
  console.log(`is waiting mint for nft id: ${nftId}: ${isWaitingMint}`);

  return (
    <div className={styles.nftBoxContainer}>
      {shouldDisplayMintedNft && <MintedNft src={nftImage} nftId={nftId} />}
      {isWaitingMint && <IsWaitingMintNft />}
      {!isMinted && <ToBeMintedNft />}
    </div>
  );
}
