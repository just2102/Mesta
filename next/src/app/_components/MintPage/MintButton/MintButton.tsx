"use client";

import { Button } from "@mui/material";
import styles from "./MintButton.module.scss";
import { useMint } from "~/app/api/web3/hooks/write/useMint";

interface Props {
  collectionAddress: `0x${string}` | undefined;
}

export default function MintButton({ collectionAddress }: Props) {
  const { data, isLoading, isSuccess, write } = useMint(collectionAddress);

  return (
    <>
      <Button
        onClick={() => write()}
        className={styles.mintButton}
        variant="outlined"
      >
        Mint
      </Button>
      {isSuccess && <span>SUCCESS!</span>}
    </>
  );
}
