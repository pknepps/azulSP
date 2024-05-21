"use client"

import styles from "./page.module.css";
import {GameCenter} from "@/app/ui/gameCenter"
import {ReactElement } from "react";

export default function Home() : ReactElement | null {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <div className={styles.left}>
              <div className={styles.testRectangle}>
                  <div className={styles.innerRectangle} style={{gridColumnStart : 1}}>
                      1
                  </div>
                  <div className={styles.innerRectangle} style={{gridColumnStart : 2}}>
                      2
                  </div>
              </div>
          </div>
          {GameCenter([1,2,5,1,13,2, 100])}
      </div>
    </main>
  );
}