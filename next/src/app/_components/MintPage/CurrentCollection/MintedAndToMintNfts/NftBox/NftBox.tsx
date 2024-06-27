import { useNftData } from "~/app/api/web3/hooks/read/useNftData";

import styles from "./NftBox.module.scss";
import { ToBeMintedNft } from "./ToBeMintedNft";
import { MintedNft } from "./MintedNft";
import { IsWaitingMintNft } from "./IsWaitingMintNft";

interface Props {
  nftId: number;
  collectionAddress: string;
  isMinted: boolean;

  mintTx: `0x${string}` | undefined;
  mintingNftId: number;
}
export function NftBox({
  nftId,
  collectionAddress,
  isMinted,
  mintTx,
  mintingNftId,
}: Props) {
  const { nftImage, error, isLoading } = useNftData(
    nftId,
    collectionAddress,
    isMinted
  );
  const shouldDisplayMintedNft = isMinted && nftImage;

  const isMintingThisNft = mintingNftId === nftId && mintTx;

  return (
    <div className={styles.nftBoxContainer}>
      {shouldDisplayMintedNft && <MintedNft src={nftImage} nftId={nftId} />}
      {isMintingThisNft && <IsWaitingMintNft />}
      {!isMinted && <ToBeMintedNft />}
    </div>
  );
}
