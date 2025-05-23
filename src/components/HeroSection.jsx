"use client";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import styles from "./HeroSection.module.css";

function HeroSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animation can be added back later if needed
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.heroSection}
      style={{
        backgroundImage: `url('/dark-sci-fi-background.png')`,
      }}
    >
      {/* Overlay gradient */}
      <div className={styles.heroOverlay}></div>

      {/* Content */}
      <div className="container">
        <div className={styles.heroContent}>
          <h1 ref={titleRef} className={styles.heroTitle}>
            CineStream
          </h1>
          <p ref={subtitleRef} className={styles.heroDescription}>
            Premium cinematic experiences at your fingertips. Subscribe today
            for exclusive content.
          </p>

          <div ref={ctaRef} className={styles.heroButtons}>
            <Link
              to="/dashboard"
              className={`${styles.heroButton} ${styles.primary}`}
            >
              <Play size={18} />
              Explore Library
            </Link>
            <Link
              to="/plans"
              className={`${styles.heroButton} ${styles.secondary}`}
            >
              Subscribe Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
