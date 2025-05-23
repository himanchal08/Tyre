"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import VideoCarousel from "../components/VideoCarousel";
import SearchComponent from "../components/SearchComponent";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";
import { videoData } from "../data/video-data";
import { SubscriptionAPI } from "../services/subscription-api";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndTime, setSubscriptionEndTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("trending");
  const [filteredVideos, setFilteredVideos] = useState(videoData);

  useEffect(() => {
    // Get current user
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (user) {
      setCurrentUser(user);
      checkSubscription(user.id);
    }
  }, []);

  useEffect(() => {
    // Filter and sort videos
    let filtered = videoData;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((video) => {
        switch (selectedCategory) {
          case "action":
          case "drama":
          case "comedy":
          case "thriller":
          case "documentary":
          case "sci-fi":
          case "horror":
          case "romance":
            return video.category === selectedCategory;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "duration-asc":
          return Number.parseInt(a.duration) - Number.parseInt(b.duration);
        case "duration-desc":
          return Number.parseInt(b.duration) - Number.parseInt(a.duration);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "trending":
        default:
          return b.trending ? 1 : -1;
      }
    });

    setFilteredVideos(filtered);
  }, [selectedCategory, selectedSort]);

  const checkSubscription = async (userId) => {
    const result = await SubscriptionAPI.getUserSubscription(userId);
    if (result.success && result.isActive) {
      setIsSubscribed(true);
      setSubscriptionEndTime(
        result.subscription.startTime + result.subscription.duration
      );
    }
  };

  const handleVideoClick = (videoId) => {
    const video = videoData.find((v) => v.id === videoId);

    if (video.premium && !isSubscribed) {
      navigate("/plans");
    } else {
      navigate(`/watch/${videoId}`);
    }
  };

  const handleVideoSelect = (video) => {
    handleVideoClick(video.id);
  };

  const groupedVideos = {
    trending: filteredVideos.filter((video) => video.trending),
    new: filteredVideos.filter((video) => video.new),
    continueWatching: filteredVideos.filter((video) => video.progress > 0),
    free: filteredVideos.filter((video) => !video.premium),
    premium: filteredVideos.filter((video) => video.premium),
  };

  return (
    <div className={styles.dashboard}>
      <DashboardHeader
        isSubscribed={isSubscribed}
        endTime={subscriptionEndTime}
        currentUser={currentUser}
        searchComponent={
          <SearchComponent
            onVideoSelect={handleVideoSelect}
            isSubscribed={isSubscribed}
          />
        }
      />

      {!isSubscribed && (
        <div className={styles.subscriptionBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <h3 className={styles.bannerTitle}>Unlock Premium Content</h3>
              <p className={styles.bannerDescription}>
                Subscribe now to access all premium movies and shows.
              </p>
            </div>
            <Link to="/plans" className={styles.bannerButton}>
              View Plans
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      <div className={`container ${styles.dashboardContent}`}>
        {/* Filters */}
        <div className={styles.filtersContainer}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </div>

        {/* Video Carousels */}
        {groupedVideos.continueWatching.length > 0 && (
          <VideoCarousel
            title="Continue Watching"
            videos={groupedVideos.continueWatching}
            isSubscribed={isSubscribed}
            onVideoClick={handleVideoClick}
            showProgress={true}
          />
        )}

        <VideoCarousel
          title="Trending Now"
          videos={groupedVideos.trending}
          isSubscribed={isSubscribed}
          onVideoClick={handleVideoClick}
        />

        <VideoCarousel
          title="New Releases"
          videos={groupedVideos.new}
          isSubscribed={isSubscribed}
          onVideoClick={handleVideoClick}
        />

        {isSubscribed && (
          <VideoCarousel
            title="Premium Collection"
            videos={groupedVideos.premium}
            isSubscribed={isSubscribed}
            onVideoClick={handleVideoClick}
          />
        )}

        <VideoCarousel
          title="Free to Watch"
          videos={groupedVideos.free}
          isSubscribed={isSubscribed}
          onVideoClick={handleVideoClick}
        />
      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;
