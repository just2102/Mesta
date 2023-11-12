import Image from "next/image";
import toBeMintedImage from "~/assets/toBeMinted.webp";
import styles from "./NftBox.module.scss";

export function ToBeMintedNft() {
  return (
    <Image
      src={toBeMintedImage}
      alt="NFT not minted yet"
      className={`${styles.nftImage} ${styles.notMinted}`}
      width={400}
      height={400}
    />
  );
}
