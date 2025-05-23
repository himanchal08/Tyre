"use client";

import { useRef } from "react";
import { Lock, Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./PreviewGallery.module.css";

// Sample video data if the imported data is not available
const sampleVideoData = [
  {
    id: "1",
    title: "Cosmic Odyssey",
    thumbnail: "/dark-sci-fi-background.png",
    duration: "2h 15m",
    premium: false,
  },
  {
    id: "2",
    title: "Neon Dystopia",
    thumbnail: "/cyberpunk-city-neon.png",
    duration: "1h 48m",
    premium: true,
  },
  {
    id: "3",
    title: "Quantum Realms",
    thumbnail: "/abstract-quantum-physics.png",
    duration: "2h 05m",
    premium: false,
  },
  {
    id: "4",
    title: "Deep Sea Mysteries",
    thumbnail: "/bioluminescent-deep-sea.png",
    duration: "1h 52m",
    premium: true,
  },
  {
    id: "5",
    title: "Space Explorers",
    thumbnail: "/futuristic-space-scene.png",
    duration: "2h 30m",
    premium: true,
  },
  {
    id: "6",
    title: "Mountain Expedition",
    thumbnail: "/epic-mountain-climbers-sunrise.png",
    duration: "1h 45m",
    premium: false,
  },
];

function PreviewGallery() {
  const sectionRef = useRef(null);
  const previewVideos = sampleVideoData;

  return (
    <section ref={sectionRef} className={styles.previewGallery}>
      <div className="container">
        <h2 className={styles.galleryTitle}>
          Explore Our <span className={styles.titleHighlight}>Content</span>
        </h2>

        <div className={styles.galleryGrid}>
          {previewVideos.map((video) => (
            <Link to="/dashboard" key={video.id} className={styles.galleryItem}>
              <div
                className={styles.galleryThumbnail}
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                <div className={styles.galleryOverlay}></div>

                {/* Premium badge */}
                {video.premium && (
                  <div className={styles.premiumBadge}>PREMIUM</div>
                )}

                {/* Blur overlay for premium content */}
                {video.premium && <div className={styles.premiumOverlay}></div>}

                {/* Play or lock icon */}
                <div className={styles.galleryIcon}>
                  {video.premium ? (
                    <div className={styles.lockIcon}>
                      <Lock size={20} />
                    </div>
                  ) : (
                    <div className={styles.playIcon}>
                      <Play size={20} />
                    </div>
                  )}
                </div>
              </div>

              {/* Video info */}
              <div className={styles.galleryInfo}>
                <h3 className={styles.galleryItemTitle}>{video.title}</h3>
                <p className={styles.galleryDuration}>{video.duration}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link to="/dashboard" className={styles.viewAllButton}>
            View All Content
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PreviewGallery;
