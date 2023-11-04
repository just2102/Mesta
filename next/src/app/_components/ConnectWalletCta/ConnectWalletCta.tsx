import { Box, Typography } from "@mui/material";
import styles from "./ConnectWalletCta.module.scss";

export function ConnectWalletCta() {
  return (
    <Box className={styles.connectWalletCta}>
      <Typography>
        Please connect your wallet to one of the supported networks
      </Typography>
    </Box>
  );
}
