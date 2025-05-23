"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { videoData } from "../data/video-data";
import styles from "./SearchComponent.module.css";

function SearchComponent({ onVideoSelect, isSubscribed }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Add click outside listener to close search results
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = videoData.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm]);

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleSelectVideo = (video) => {
    if (video.premium && !isSubscribed) {
      // Handle premium content selection when not subscribed
      onVideoSelect({ ...video, requiresSubscription: true });
    } else {
      onVideoSelect(video);
    }
    setIsSearching(false);
    setSearchTerm("");
  };

  return (
    <div className={styles.searchWrapper} ref={searchRef}>
      <div className={styles.searchInputContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for movies, shows, genres..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isSearching && searchResults.length > 0 && (
        <div className={styles.searchResults}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {searchResults.length} results
            </span>
          </div>
          <div className={styles.resultsList}>
            {searchResults.map((video) => (
              <div
                key={video.id}
                className={styles.resultItem}
                onClick={() => handleSelectVideo(video)}
              >
                <div className={styles.resultThumbnail}>
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                  />
                  {video.premium && (
                    <span className={styles.premiumBadge}>PREMIUM</span>
                  )}
                </div>
                <div className={styles.resultInfo}>
                  <h4 className={styles.resultTitle}>{video.title}</h4>
                  <p className={styles.resultCategory}>{video.category}</p>
                  <p className={styles.resultDuration}>{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSearching && searchTerm && searchResults.length === 0 && (
        <div className={styles.noResults}>
          <p>No results found for "{searchTerm}"</p>
          <span>Try different keywords or browse categories</span>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
