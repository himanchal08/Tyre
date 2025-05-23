"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./LoaderScreen.module.css";

function LoaderScreen() {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([textRef1.current, textRef2.current, textRef3.current], {
      opacity: 0,
      y: 20,
    });

    // Animation sequence
    tl.to(textRef1.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    })
      .to(textRef1.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.in",
      })
      .to(textRef2.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      })
      .to(textRef2.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.in",
      })
      .to(textRef3.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      })
      .to(textRef3.current, {
        opacity: 0.8,
        scale: 1.1,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.loaderScreen}>
      <div className={styles.textContainer}>
        <p ref={textRef1} className={`${styles.loaderText} ${styles.mono}`}>
          Initializing Quantum Core...
        </p>
        <p ref={textRef2} className={`${styles.loaderText} ${styles.mono}`}>
          Aligning Visual Streams...
        </p>
        <p
          ref={textRef3}
          className={`${styles.loaderText} ${styles.final} ${styles.glowText}`}
        >
          🚀 Launching CineStream...
        </p>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
}

export default LoaderScreen;
