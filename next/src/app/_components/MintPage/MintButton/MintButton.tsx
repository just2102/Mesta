"use client";

import { Button } from "@mui/material";
import styles from "./MintButton.module.scss";
import { useMint } from "~/app/api/web3/hooks/write/useMint";
import { useEffect } from "react";

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
  return (
    <>
      <Button
        disabled={isSendingMintTx || isWaitingMint}
        onClick={mint}
        className={styles.mintButton}
        variant="outlined"
      >
        Mint (Free)
      </Button>
    </>
  );
}
