import Image from "next/image";
import styles from "./page.module.css";
import SignUpPage from "./signUp/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <SignUpPage />
    </main>
  );
}
