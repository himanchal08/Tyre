"use client";

import { videoData } from "../data/video-data";
import { Lock, Play } from "lucide-react";
import styles from "./RelatedVideos.module.css";

function RelatedVideos({ currentVideoId, isSubscribed, onVideoClick }) {
  // Filter out current video and get 4 related videos
  const relatedVideos = videoData
    .filter((video) => video.id !== currentVideoId)
    .slice(0, 4);

  return (
    <div className={styles.relatedVideos}>
      <h2 className={styles.relatedVideosTitle}>You May Also Like</h2>

      <div className={styles.relatedVideosGrid}>
        {relatedVideos.map((video) => (
          <div
            key={video.id}
            className={`${styles.relatedVideoCard} video-card`}
            onClick={() => onVideoClick(video.id)}
          >
            <div
              className={styles.relatedVideoThumbnail}
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            >
              {/* Premium overlay */}
              {video.premium && !isSubscribed && (
                <div className={styles.premiumOverlay}>
                  <div className={styles.premiumLock}>
                    <Lock size={16} className="text-purple-400" />
                  </div>
                </div>
              )}

              {/* Premium badge */}
              {video.premium && <div className="premium-badge">PREMIUM</div>}

              {/* Play button */}
              {(!video.premium || isSubscribed) && (
                <div className={styles.playButton}>
                  <div className={styles.playButtonInner}>
                    <Play size={16} className="text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Video info */}
            <div className={`${styles.videoInfo} gradient-overlay`}>
              <h4 className={styles.videoTitle}>{video.title}</h4>
              <p className={styles.videoDuration}>{video.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedVideos;
