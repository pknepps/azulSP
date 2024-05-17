"use client"

import styles from "./page.module.css";
import {GameCenter} from "@/app/ui/gameCenter"
import {ReactElement } from "react";

export default function Home() : ReactElement | null {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          {GameCenter([1,2,5,1,13,2, 100])}
      </div>
    </main>
  );
}