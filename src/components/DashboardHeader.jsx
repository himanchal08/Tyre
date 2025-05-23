"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, User, Clock, LogOut, Search } from "lucide-react";
import styles from "./DashboardHeader.module.css";

function DashboardHeader({
  isSubscribed,
  endTime,
  currentUser,
  searchComponent,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const formatTimeRemaining = () => {
    if (!endTime) return null;

    const now = new Date().getTime();
    const remaining = endTime - now;

    if (remaining <= 0) return null;

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentSubscription");
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo and mobile menu button */}
        <div className={styles.headerLeft}>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>CineStream</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link
            to="/dashboard"
            className={`${styles.navLink} ${styles.active}`}
          >
            Home
          </Link>
          <Link to="/dashboard?category=movies" className={styles.navLink}>
            Movies
          </Link>
          <Link to="/dashboard?category=shows" className={styles.navLink}>
            TV Shows
          </Link>
          <Link to="/dashboard?category=new" className={styles.navLink}>
            New & Popular
          </Link>
        </nav>

        {/* Search Component */}
        <div className={styles.searchContainer}>
          {searchOpen ? (
            searchComponent
          ) : (
            <button
              className={styles.searchButton}
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
          )}
        </div>

        {/* Right side actions */}
        <div className={styles.headerRight}>
          {/* Subscription status */}
          {isSubscribed && (
            <div className={styles.subscriptionBadge}>
              <Clock size={14} className={styles.subscriptionIcon} />
              <span className={styles.subscriptionText}>
                {formatTimeRemaining()} left
              </span>
            </div>
          )}

          {/* Notifications */}
          <button
            className={styles.notificationButton}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className={styles.notificationDot}></span>
          </button>

          {/* User profile */}
          <div className={styles.userMenu}>
            <button
              className={styles.userButton}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label="User menu"
            >
              <div className={styles.userAvatar}>
                <User size={16} />
              </div>
              {currentUser && (
                <span className={styles.userName}>
                  {currentUser.name || "User"}
                </span>
              )}
            </button>

            {userMenuOpen && (
              <div className={styles.userDropdown}>
                <div className={styles.userDropdownHeader}>
                  <p className={styles.userDropdownName}>
                    {currentUser?.name || "User"}
                  </p>
                  <p className={styles.userDropdownEmail}>
                    {currentUser?.email || "user@example.com"}
                  </p>
                </div>

                <div className={styles.userDropdownContent}>
                  <Link
                    to="/profile"
                    className={styles.dropdownLink}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <Link
                    to="/subscription"
                    className={styles.dropdownLink}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Subscription
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`${styles.dropdownLink} ${styles.danger}`}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <Link
              to="/dashboard"
              className={`${styles.mobileNavLink} ${styles.active}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard?category=movies"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              to="/dashboard?category=shows"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              TV Shows
            </Link>
            <Link
              to="/dashboard?category=new"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              New & Popular
            </Link>

            {/* Mobile search */}
            <div className={styles.mobileSearch}>{searchComponent}</div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
