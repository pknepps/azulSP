"use client"

import styles from "./page.module.css";
import {GameCenter} from "@/app/ui/gameCenter"
import {ReactElement } from "react";
import SquareBoard from "@/app/ui/board/board";

export default function Home() : ReactElement | null {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <div className={styles.left}>
              {SquareBoard()}
          </div>
          {GameCenter([1,2,5,1,13,2, 100])}
      </div>
    </main>
  );
}