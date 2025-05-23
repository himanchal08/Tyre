"use client";

import { useRef } from "react";
import { Zap, Shield, Film, Tv } from "lucide-react";
import styles from "./WhySubscribe.module.css";

const features = [
  {
    icon: <Zap size={24} className={styles.featureIconSvg} />,
    title: "Ad-Free Experience",
    description: "Enjoy uninterrupted streaming without any advertisements.",
  },
  {
    icon: <Film size={24} className={styles.featureIconSvg} />,
    title: "Exclusive Content",
    description: "Access premium movies and shows not available to free users.",
  },
  {
    icon: <Shield size={24} className={styles.featureIconSvg} />,
    title: "HD Quality",
    description:
      "Stream all content in high definition for the best experience.",
  },
  {
    icon: <Tv size={24} className={styles.featureIconSvg} />,
    title: "Watch Anywhere",
    description:
      "Stream on your phone, tablet, or computer with no restrictions.",
  },
];

function WhySubscribe() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.whySubscribe}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          Why <span className={styles.titleHighlight}>Subscribe</span>?
        </h2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhySubscribe;
