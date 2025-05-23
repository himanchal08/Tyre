"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import { SubscriptionAPI } from "../services/subscription-api";
import styles from "./SubscriptionPage.module.css";

function SubscriptionPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (user) {
        setCurrentUser(user);

        // Get current subscription
        const subResult = await SubscriptionAPI.getUserSubscription(user.id);
        if (subResult.success && subResult.subscription) {
          setCurrentSubscription(subResult.subscription);
        }

        // Get subscription history
        const historyResult = await SubscriptionAPI.getSubscriptionHistory(
          user.id
        );
        if (historyResult.success) {
          setSubscriptionHistory(historyResult.subscriptions);
        }
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeRemaining = (subscription) => {
    const now = new Date().getTime();
    const endTime = subscription.startTime + subscription.duration;
    const remaining = endTime - now;

    if (remaining <= 0) return "Expired";

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    } else {
      return `${hours}h remaining`;
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = {
      active: styles.badgeActive,
      expired: styles.badgeExpired,
      cancelled: styles.badgeCancelled,
    };

    return (
      <span
        className={`${styles.badge} ${
          badgeClass[status] || badgeClass.expired
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleCancelSubscription = async () => {
    if (
      currentSubscription &&
      window.confirm("Are you sure you want to cancel your subscription?")
    ) {
      const result = await SubscriptionAPI.cancelSubscription(
        currentSubscription.id
      );
      if (result.success) {
        setCurrentSubscription({ ...currentSubscription, status: "cancelled" });
        // Refresh the page to update all components
        window.location.reload();
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.subscriptionPage}>
      <DashboardHeader currentUser={currentUser} />

      <div className={`container ${styles.subscriptionContainer}`}>
        <h1 className={styles.pageTitle}>Subscription Management</h1>

        {/* Current Subscription */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <CreditCard className={styles.cardIcon} />
              Current Subscription
            </h2>
          </div>
          <div className={styles.cardContent}>
            {currentSubscription && currentSubscription.status === "active" ? (
              <div className={styles.subscriptionDetails}>
                <div className={styles.subscriptionHeader}>
                  <div>
                    <h3 className={styles.subscriptionTitle}>Premium Access</h3>
                    <p className={styles.subscriptionPlan}>
                      Plan ID: {currentSubscription.planId}
                    </p>
                  </div>
                  {getStatusBadge(currentSubscription.status)}
                </div>

                <div className={styles.subscriptionGrid}>
                  <div className={styles.subscriptionItem}>
                    <Calendar className={styles.subscriptionIcon} />
                    <div>
                      <p className={styles.subscriptionLabel}>Started</p>
                      <p className={styles.subscriptionValue}>
                        {formatDate(currentSubscription.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className={styles.subscriptionItem}>
                    <Clock className={styles.subscriptionIcon} />
                    <div>
                      <p className={styles.subscriptionLabel}>Time Remaining</p>
                      <p className={styles.subscriptionValue}>
                        {formatTimeRemaining(currentSubscription)}
                      </p>
                    </div>
                  </div>

                  <div className={styles.subscriptionItem}>
                    <CheckCircle className={styles.subscriptionIcon} />
                    <div>
                      <p className={styles.subscriptionLabel}>Status</p>
                      <p
                        className={`${styles.subscriptionValue} ${styles.statusActive}`}
                      >
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.subscriptionActions}>
                  <button
                    onClick={handleCancelSubscription}
                    className={styles.cancelButton}
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.noSubscription}>
                <XCircle className={styles.noSubscriptionIcon} />
                <h3 className={styles.noSubscriptionTitle}>
                  No Active Subscription
                </h3>
                <p className={styles.noSubscriptionText}>
                  Subscribe to access premium content
                </p>
                <a href="/plans" className={styles.subscribeButton}>
                  View Plans
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Subscription History */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Subscription History</h2>
            <p className={styles.cardDescription}>
              Your past and current subscriptions
            </p>
          </div>
          <div className={styles.cardContent}>
            {subscriptionHistory.length > 0 ? (
              <div className={styles.historyList}>
                {subscriptionHistory.map((subscription) => (
                  <div key={subscription.id} className={styles.historyItem}>
                    <div className={styles.historyContent}>
                      <div className={styles.historyHeader}>
                        <h4 className={styles.historyTitle}>
                          Plan: {subscription.planId}
                        </h4>
                        {getStatusBadge(subscription.status)}
                      </div>
                      <div className={styles.historyGrid}>
                        <div>
                          <span className={styles.historyLabel}>Started:</span>
                          <span className={styles.historyValue}>
                            {formatDate(subscription.createdAt)}
                          </span>
                        </div>
                        <div>
                          <span className={styles.historyLabel}>Status:</span>
                          <span className={styles.historyValue}>
                            {subscription.status}
                          </span>
                        </div>
                        <div>
                          <span className={styles.historyLabel}>Duration:</span>
                          <span className={styles.historyValue}>
                            {subscription.duration / (1000 * 60 * 60 * 24)} days
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noHistory}>
                <p className={styles.noHistoryText}>
                  No subscription history found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;
