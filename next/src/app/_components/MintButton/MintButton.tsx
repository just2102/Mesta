import { Button } from "@mui/material";
import styles from "./MintButton.module.scss";

export default function MintButton() {
  return (
    <Button className={styles.mintButton} variant="outlined">
      Mint
    </Button>
  );
}
