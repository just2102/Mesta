import styles from "./index.module.css";
import { MintPage } from "./_components/MintPage/MintPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className={styles.main}>
      <MintPage />
    </main>
  );
}
