"use client";

import dynamic from "next/dynamic";
const Landing = dynamic(() => import('@/components/Landing'), {
  ssr: false,
});
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Landing />
    </div>
  );
}
