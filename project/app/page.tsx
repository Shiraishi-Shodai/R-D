import Image from "next/image";
import styles from "./page.module.css";
import SignUpForm from "./components/form/SighUpForm";
 
export default function Home() {
  return (
    <main className={styles.main}>
      <SignUpForm/>
    </main>
  );
}