"use client";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import PlanCards from "../components/PlanCards";
import Footer from "../components/Footer";
import styles from "./PlansPage.module.css";

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function PlansPage() {
  const headerRef = useRef(null);

  useEffect(() => {
    // Animation for header
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className={styles.plansPage}>
      {/* Header */}
      <header ref={headerRef} className={styles.plansHeader}>
        <div className="container header-container">
          <Link to="/" className={styles.headerLeft}>
            <ArrowLeft size={20} />
            <span className={styles.headerLogo}>CineStream</span>
          </Link>

          <nav className={styles.headerNav}>
            <Link to="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
            <Link to=" /login" className={styles.navLink}>
              Sign In
            </Link>
            <Link to=" /register" className={styles.navLink}>
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            Unlock <span className={styles.heroHighlight}>Premium</span> Content
          </h1>
          <p className={styles.heroDescription}>
            Choose the perfect plan for your streaming needs. Get instant access
            to our entire premium library with HD quality and ad-free
            experience.
          </p>

          <div className={styles.featuresList}>
            <div className={styles.featureBadge}>
              <div className={styles.featureIndicator}></div>
              <span className={styles.featureText}>HD Quality</span>
            </div>
            <div className={styles.featureBadge}>
              <div className={styles.featureIndicator}></div>
              <span className={styles.featureText}>Ad-Free</span>
            </div>
            <div className={styles.featureBadge}>
              <div className={styles.featureIndicator}></div>
              <span className={styles.featureText}>All Devices</span>
            </div>
            <div className={styles.featureBadge}>
              <div className={styles.featureIndicator}></div>
              <span className={styles.featureText}>Instant Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <PlanCards />

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Can I cancel anytime?</h3>
              <p className={styles.faqAnswer}>
                Yes, you can cancel your subscription at any time. You'll
                continue to have access until the end of your current billing
                period.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>
                What devices can I watch on?
              </h3>
              <p className={styles.faqAnswer}>
                You can watch on any device including smartphones, tablets,
                computers, and smart TVs. Your subscription works across all
                platforms.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Is there a free trial?</h3>
              <p className={styles.faqAnswer}>
                We offer free content that you can access without a
                subscription. Premium content requires an active subscription.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>
                What payment methods do you accept?
              </h3>
              <p className={styles.faqAnswer}>
                We accept all major credit cards, debit cards, and digital
                payment methods for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PlansPage;
