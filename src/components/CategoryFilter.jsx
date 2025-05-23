"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import styles from "./CategoryFilter.module.css";

const categories = [
  { id: "all", name: "All", count: 0 },
  { id: "action", name: "Action", count: 15 },
  { id: "drama", name: "Drama", count: 12 },
  { id: "comedy", name: "Comedy", count: 8 },
  { id: "thriller", name: "Thriller", count: 10 },
  { id: "documentary", name: "Documentary", count: 6 },
  { id: "sci-fi", name: "Sci-Fi", count: 9 },
  { id: "horror", name: "Horror", count: 7 },
  { id: "romance", name: "Romance", count: 5 },
];

const sortOptions = [
  { id: "trending", name: "Trending" },
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "duration-asc", name: "Shortest First" },
  { id: "duration-desc", name: "Longest First" },
  { id: "alphabetical", name: "A-Z" },
];

function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
}) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  return (
    <div className={styles.categoryFilter}>
      {/* Categories */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Categories</h3>
        <div className={styles.categoriesContainer}>
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.id ? styles.active : ""
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
              {category.count > 0 && (
                <span className={styles.categoryBadge}>{category.count}</span>
              )}
            </button>
          ))}

          {categories.length > 6 && (
            <button
              className={styles.showMoreButton}
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? "Show Less" : "Show More"}
              <ChevronDown
                className={`${styles.chevronIcon} ${
                  showAllCategories ? styles.rotated : ""
                }`}
                size={16}
              />
            </button>
          )}
        </div>
      </div>

      {/* Sort Options */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Sort By</h3>
        <div className={styles.sortContainer}>
          <button
            className={styles.sortButton}
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <Filter size={16} />
            {sortOptions.find((option) => option.id === selectedSort)?.name ||
              "Select Sort"}
            <ChevronDown size={16} />
          </button>

          {showSortDropdown && (
            <div className={styles.sortDropdown}>
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.sortOption} ${
                    selectedSort === option.id ? styles.active : ""
                  }`}
                  onClick={() => {
                    onSortChange(option.id);
                    setShowSortDropdown(false);
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
