"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { videoData } from "../data/video-data";
import RelatedVideos from "../components/RelatedVideos";
import styles from "./WatchPage.module.css";

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndTime, setSubscriptionEndTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the video by ID
    const foundVideo = videoData.find((v) => v.id === id);

    if (!foundVideo) {
      navigate("/dashboard");
      return;
    }

    setVideo(foundVideo);

    // Check subscription status
    const subscription = JSON.parse(
      localStorage.getItem("subscription") || "null"
    );

    if (subscription) {
      const currentTime = new Date().getTime();
      const endTime = subscription.startTime + subscription.duration;

      if (currentTime < endTime) {
        setIsSubscribed(true);
        setSubscriptionEndTime(endTime);
      } else {
        // Subscription expired
        localStorage.removeItem("subscription");
      }
    }

    setLoading(false);
  }, [id, navigate]);

  if (loading || !video) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  // If video is premium and user is not subscribed, redirect to plans
  if (video.premium && !isSubscribed) {
    navigate("/plans");
    return null;
  }

  return (
    <div className={styles.watchPage}>
      <div className={`container ${styles.watchContainer}`}>
        <VideoPlayer
          video={video}
          isSubscribed={isSubscribed}
          endTime={subscriptionEndTime}
        />

        <div className={styles.videoDetails}>
          <h1 className={styles.videoTitle}>{video.title}</h1>
          <p className={styles.videoDescription}>{video.description}</p>

          {isSubscribed && video.premium && (
            <div className={styles.premiumAccessBadge}>
              <span className={styles.premiumAccessText}>
                Premium access expires in:{" "}
                {formatTimeRemaining(subscriptionEndTime)}
              </span>
            </div>
          )}
        </div>

        <RelatedVideos
          currentVideoId={video.id}
          isSubscribed={isSubscribed}
          onVideoClick={(id) => navigate(`/watch/${id}`)}
        />
      </div>
    </div>
  );
}

function formatTimeRemaining(endTime) {
  const now = new Date().getTime();
  const remaining = endTime - now;

  if (remaining <= 0) return "Expired";

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
}

export default WatchPage;
