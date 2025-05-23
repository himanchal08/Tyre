"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoaderScreen from "../components/LoaderScreen";
import HeroSection from "../components/HeroSection";
import PlanCards from "../components/PlanCards";
import PreviewGallery from "../components/PreviewGallery";
import WhySubscribe from "../components/WhySubscribe";
import Footer from "../components/Footer";
import styles from "./HomePage.module.css";

function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Reduced loading time for better UX

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header with sign in/sign up buttons */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link to="/" className={styles.logo}>
              CineStream
            </Link>
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginButton}>
                Sign In
              </Link>
              <Link to="/register" className={styles.registerButton}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <WhySubscribe />
        <PreviewGallery />
        <PlanCards />
        <Footer />
      </main>
    </div>
  );
}

export default HomePage;
