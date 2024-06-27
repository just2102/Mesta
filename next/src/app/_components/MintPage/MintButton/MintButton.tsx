"use client";

import { Button } from "@mui/material";
import styles from "./MintButton.module.scss";
import { useAccount } from "wagmi";
import { type CollectionData } from "~/app/api/web3/types/Collection";

interface Props {
  mint: () => void;
  isSendingMintTx: boolean;
  collectionData: CollectionData;
}

export default function MintButton({
  mint,
  isSendingMintTx,
  collectionData,
}: Props) {
  const { isConnected } = useAccount();

  const mintFinished = collectionData.totalSupply === collectionData.maxSupply;

  const getText = () => {
    if (mintFinished) {
      return "Mint is finished";
    }

    if (!isConnected) {
      return "Connect Wallet";
    }
    return "Mint (Free)";
  };

  return (
    <>
      <Button
        disabled={isSendingMintTx || !isConnected || mintFinished}
        onClick={mint}
        className={styles.mintButton}
        variant="outlined"
      >
        {getText()}
      </Button>
    </>
  );
}
