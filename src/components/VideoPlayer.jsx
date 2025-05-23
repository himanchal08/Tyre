"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Clock,
} from "lucide-react";
import styles from "./VideoPlayer.module.css";

function VideoPlayer({ video, isSubscribed, endTime }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("ended", handleEnded);

    // Save progress to localStorage every 5 seconds
    const progressInterval = setInterval(() => {
      if (videoElement.currentTime > 0) {
        const progress =
          (videoElement.currentTime / videoElement.duration) * 100;

        // Update video progress in localStorage
        const videoProgress = JSON.parse(
          localStorage.getItem("videoProgress") || "{}"
        );
        videoProgress[video.id] = progress;
        localStorage.setItem("videoProgress", JSON.stringify(videoProgress));
      }
    }, 5000);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("ended", handleEnded);
      clearInterval(progressInterval);
    };
  }, [video.id]);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const playerElement = playerRef.current;

    if (playerElement) {
      playerElement.addEventListener("mousemove", handleMouseMove);
      playerElement.addEventListener("touchstart", handleMouseMove);
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("mousemove", handleMouseMove);
        playerElement.removeEventListener("touchstart", handleMouseMove);
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e) => {
    const newTime = Number.parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatTimeRemaining = () => {
    if (!endTime) return null;

    const now = new Date().getTime();
    const remaining = endTime - now;

    if (remaining <= 0) return "Expired";

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      ref={playerRef}
      className={styles.videoPlayerContainer}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnail}
        className={styles.videoElement}
        onClick={togglePlay}
      />

      {/* Premium subscription timer */}
      {isSubscribed && video.premium && (
        <div className={styles.premiumTimer}>
          <Clock size={14} className={styles.premiumTimerIcon} />
          <span className={styles.premiumTimerText}>
            Premium: {formatTimeRemaining()} left
          </span>
        </div>
      )}

      {/* Video controls */}
      <div
        className={`${styles.videoControls} ${
          showControls ? "" : styles.hidden
        }`}
      >
        {/* Progress bar */}
        <div className={styles.progressContainer}>
          <span className={styles.timeDisplay}>{formatTime(currentTime)}</span>
          <div className={styles.progressBar}>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className={styles.progressInput}
            />
            <div
              className={styles.progressBarFill}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className={styles.timeDisplay}>{formatTime(duration)}</span>
        </div>

        {/* Control buttons */}
        <div className={styles.controlsRow}>
          <div className={styles.controlsLeft}>
            <button onClick={togglePlay} className={styles.controlButton}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={() => {
                videoRef.current.currentTime -= 10;
              }}
              className={styles.controlButton}
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={() => {
                videoRef.current.currentTime += 10;
              }}
              className={styles.controlButton}
            >
              <SkipForward size={20} />
            </button>

            <div className={styles.volumeContainer}>
              <button onClick={toggleMute} className={styles.controlButton}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <div className={styles.volumeSlider}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className={styles.volumeInput}
                />
                <div
                  className={styles.volumeSliderFill}
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <button onClick={toggleFullscreen} className={styles.controlButton}>
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>

      {/* Play/pause overlay */}
      {!isPlaying && (
        <div className={styles.playOverlay} onClick={togglePlay}>
          <div className={styles.playButtonLarge}>
            <Play size={32} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
