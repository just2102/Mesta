import styles from "./Header.module.scss";
import ConnectWalletBtn from "./ConnectWalletBtn";

export function Header() {
  return (
    <header className={styles.header}>
      <h2>Mesta</h2>
      <ConnectWalletBtn />
    </header>
  );
}
