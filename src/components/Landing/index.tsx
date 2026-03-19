"use client";

import Scene from "./Scene";
import styles from "./style.module.scss";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(canvasRef.current, {
            opacity: 0,
            delay: 1,
            ease: "power2.out",
        })
    }, {
        scope: landingRef
    });

    return (
        <section className={styles.landing} ref={landingRef}>

            <header className={styles.header}>
                <span className={styles.logo}>Saurow</span>
                <nav className={styles.nav}>
                    <Link href="#">Work</Link>
                    <Link href="#">About</Link>
                    <Link href="#">Contact</Link>
                </nav>
            </header>

            <div className={styles.canvas} ref={canvasRef}>
                <Scene />
            </div>

            <div className={styles.hero}>
                <p className={styles.eyebrow}>Visual Experience</p>
                <h1 className={styles.title}>
                    Mask
                </h1>
            </div>

            <div className={styles.meta}>
                <span>2025 </span>
                <span className={styles.dot} />
                <span>Scroll</span>
            </div>

            <div className={styles.grain} aria-hidden />
        </section>
    );
}