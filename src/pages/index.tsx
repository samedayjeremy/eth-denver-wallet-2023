import Head from "next/head";
import { Inter } from "next/font/google";

import React from "react";
import styles from "../styles/main.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [code, setCode] = React.useState<string>("");
  const [nonce, setNonce] = React.useState<number>();

  const run = () => {
    console.log("run code");
  }

  return (
    <>
      <Head>
        <title>Lawrence's Wallet</title>
        <meta name="description" content="Built at ETH Denver" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>Lawrence Wallet</div>
          <img src="/wand.png" width="40px" />
        </div>
        <div className={styles.editorWrapper}>
          <textarea className={styles.editor}></textarea>
          <div className={styles.bottomWrapper}>
            <input
              type="number"
              placeholder="nonce"
              onChange={(e) => setNonce(Number(e.target.value))}
            />
            <button className={styles.button} onClick={run}>Run</button>
            
          </div>
          <div style={{textAlign:"left", color: "#F25E7A"}}>0xed5af388653567af2f388e6224dc7c4b3241c544</div>
        </div>
      </div>
    </>
  );
}
