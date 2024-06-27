"use client";

import { Button } from "@mui/material";
import styles from "./MintButton.module.scss";
import { useAccount } from "wagmi";

interface Props {
  mint: () => void;
  isSendingMintTx: boolean;
  isWaitingMint: boolean;
}

export default function MintButton({
  mint,
  isSendingMintTx,
  isWaitingMint,
}: Props) {
  const { isConnected } = useAccount();

  return (
    <>
      <Button
        disabled={isSendingMintTx || isWaitingMint || !isConnected}
        onClick={mint}
        className={styles.mintButton}
        variant="outlined"
      >
        {isConnected ? "Mint (Free)" : "Connect Wallet"}
      </Button>
    </>
  );
}
