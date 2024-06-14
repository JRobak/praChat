import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
      <main className={styles.main}>
          <div className={styles.container}>
              <div className={styles.mainContent}>
                  <p>Main</p>
              </div>
              <div className={styles.nav}>
                  <p>Nav</p>
              </div>
          </div>
      </main>
  );
}
