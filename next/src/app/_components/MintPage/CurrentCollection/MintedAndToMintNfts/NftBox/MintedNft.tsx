import Image from "next/image";
import styles from "./NftBox.module.scss";

export function MintedNft({ src, nftId }: { src: string; nftId: number }) {
  return (
    <Image
      src={src}
      alt={`NFT #${nftId}`}
      className={styles.nftImage}
      width={400}
      height={400}
    />
  );
}
