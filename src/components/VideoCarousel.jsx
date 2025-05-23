"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Lock, Play } from "lucide-react";
import styles from "./VideoCarousel.module.css";

function VideoCarousel({
  title,
  videos,
  isSubscribed,
  onVideoClick,
  showProgress = false,
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselHeader}>
        <h3 className={styles.carouselTitle}>{title}</h3>

        <div className={styles.carouselControls}>
          <button
            onClick={() => scroll("left")}
            className={styles.controlButton}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className={styles.controlButton}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={`${styles.carouselItems} scrollbar-hide`}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className={`${styles.carouselItem} video-card`}
            onClick={() => onVideoClick(video.id)}
          >
            <div className={styles.carouselItemInner}>
              <div
                className={styles.carouselThumbnail}
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                {/* Premium overlay */}
                {video.premium && !isSubscribed && (
                  <div className={styles.premiumOverlay}>
                    <div className={styles.premiumLock}>
                      <Lock size={20} className="text-purple-400" />
                    </div>
                  </div>
                )}

                {/* Premium badge */}
                {video.premium && <div className="premium-badge">PREMIUM</div>}

                {/* Play button */}
                {(!video.premium || isSubscribed) && (
                  <div className={styles.playButton}>
                    <div className={styles.playButtonInner}>
                      <Play size={20} className="text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              {showProgress && video.progress > 0 && (
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressIndicator}
                    style={{ width: `${video.progress}%` }}
                  ></div>
                </div>
              )}

              {/* Video info */}
              <div className={`${styles.videoInfo} gradient-overlay`}>
                <h4 className={styles.videoTitle}>{video.title}</h4>
                <p className={styles.videoDuration}>{video.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoCarousel;
