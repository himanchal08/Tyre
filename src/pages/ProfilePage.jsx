"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Settings,
  CreditCard,
  Clock,
  Bell,
  Shield,
  LogOut,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  ChevronRight,
  Film,
  Calendar,
  CheckCircle,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [currentUser, setCurrentUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    avatar: "",
    notifications: {
      email: true,
      newContent: true,
      recommendations: true,
    },
    preferences: {
      autoplay: true,
      subtitles: false,
      quality: "auto",
    },
  });

  // Mock viewing history
  const [viewingHistory, setViewingHistory] = useState([
    {
      id: "1",
      title: "Cosmic Odyssey",
      thumbnail: "/cyberpunk-city-neon.png",
      progress: 75,
      watchedOn: "2023-05-15T14:30:00",
      duration: "1h 45m",
    },
    {
      id: "2",
      title: "Deep Sea Explorers",
      thumbnail: "/bioluminescent-deep-sea.png",
      progress: 100,
      watchedOn: "2023-05-12T20:15:00",
      duration: "52m",
    },
    {
      id: "3",
      title: "Quantum Physics Explained",
      thumbnail: "/abstract-quantum-physics.png",
      progress: 30,
      watchedOn: "2023-05-10T09:45:00",
      duration: "1h 20m",
    },
  ]);

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = () => {
      const userData = localStorage.getItem("currentUser");
      const subscriptionData = localStorage.getItem("currentSubscription");

      setTimeout(() => {
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setCurrentUser(parsedUser);
          setFormData((prev) => ({
            ...prev,
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            avatar: parsedUser.avatar || "",
          }));
        }

        if (subscriptionData) {
          setSubscription(JSON.parse(subscriptionData));
        }

        setLoading(false);
      }, 800);
    };

    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveProfile = () => {
    // Validate form
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("New passwords don't match");
      return;
    }

    // Update user data
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      email: formData.email,
      // In a real app, you'd handle password changes securely
    };

    // Save to localStorage (in a real app, you'd send to a server)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setEditMode(false);

    // Show success message
    alert("Profile updated successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentSubscription");
    window.location.href = " /login";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <DashboardHeader
        isSubscribed={!!subscription}
        endTime={subscription?.endTime}
        currentUser={currentUser}
      />

      <div className={styles.profileContainer}>
        <div className={styles.sidebar}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {formData.avatar ? (
                <img
                  src={formData.avatar || "/placeholder.svg"}
                  alt={formData.name}
                />
              ) : (
                <User size={32} />
              )}
            </div>
            <div className={styles.userDetails}>
              <h3>{currentUser?.name || "User"}</h3>
              <p>{currentUser?.email || "user@example.com"}</p>
              {subscription && (
                <span className={styles.planBadge}>
                  {subscription.plan} Plan
                </span>
              )}
            </div>
          </div>

          <nav className={styles.navigation}>
            <button
              className={`${styles.navButton} ${
                activeTab === "profile" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={20} />
              <span>Profile</span>
              <ChevronRight size={16} className={styles.navArrow} />
            </button>

            <button
              className={`${styles.navButton} ${
                activeTab === "subscription" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("subscription")}
            >
              <CreditCard size={20} />
              <span>Subscription</span>
              <ChevronRight size={16} className={styles.navArrow} />
            </button>

            <button
              className={`${styles.navButton} ${
                activeTab === "history" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              <Clock size={20} />
              <span>Viewing History</span>
              <ChevronRight size={16} className={styles.navArrow} />
            </button>

            <button
              className={`${styles.navButton} ${
                activeTab === "notifications" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell size={20} />
              <span>Notifications</span>
              <ChevronRight size={16} className={styles.navArrow} />
            </button>

            <button
              className={`${styles.navButton} ${
                activeTab === "preferences" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("preferences")}
            >
              <Settings size={20} />
              <span>Preferences</span>
              <ChevronRight size={16} className={styles.navArrow} />
            </button>

            <button
              className={`${styles.navButton} ${
                activeTab === "security" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("security")}
            >
              <Shield size={20} />
              <span>Security</span>
              <ChevronRight size={16} className={styles.navArrow} />
            </button>

            <button
              className={`${styles.navButton} ${styles.logoutButton}`}
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        <div className={styles.content}>
          {activeTab === "profile" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Profile Information</h2>
                <button
                  className={styles.editButton}
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? (
                    <>
                      <X size={16} />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit size={16} />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>

              {editMode ? (
                <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="avatar">Profile Picture URL</label>
                    <input
                      type="text"
                      id="avatar"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      placeholder="https://example.com/your-image.jpg"
                    />
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={styles.saveButton}
                      onClick={handleSaveProfile}
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className={styles.profileInfo}>
                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Full Name</span>
                    <span className={styles.infoValue}>
                      {currentUser?.name || "Not set"}
                    </span>
                  </div>

                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Email Address</span>
                    <span className={styles.infoValue}>
                      {currentUser?.email || "Not set"}
                    </span>
                  </div>

                  <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Member Since</span>
                    <span className={styles.infoValue}>
                      {currentUser?.joinDate || "May 2023"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "subscription" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Subscription Details</h2>
                <Link to="/subscription" className={styles.manageButton}>
                  Manage Subscription
                </Link>
              </div>

              {subscription ? (
                <div className={styles.subscriptionDetails}>
                  <div className={styles.planCard}>
                    <div className={styles.planHeader}>
                      <h3>{subscription.plan} Plan</h3>
                      <span className={styles.planPrice}>
                        ${subscription.price}/month
                      </span>
                    </div>

                    <div className={styles.planFeatures}>
                      <div className={styles.planFeature}>
                        <CheckCircle size={16} className={styles.featureIcon} />
                        <span>HD Streaming</span>
                      </div>
                      <div className={styles.planFeature}>
                        <CheckCircle size={16} className={styles.featureIcon} />
                        <span>Watch on any device</span>
                      </div>
                      <div className={styles.planFeature}>
                        <CheckCircle size={16} className={styles.featureIcon} />
                        <span>Cancel anytime</span>
                      </div>
                    </div>

                    <div className={styles.planStatus}>
                      <div className={styles.statusItem}>
                        <span className={styles.statusLabel}>Status</span>
                        <span className={styles.statusValue}>
                          <span className={styles.activeStatus}>Active</span>
                        </span>
                      </div>

                      <div className={styles.statusItem}>
                        <span className={styles.statusLabel}>
                          Next billing date
                        </span>
                        <span className={styles.statusValue}>
                          {new Date(subscription.endTime).toLocaleDateString()}
                        </span>
                      </div>

                      <div className={styles.statusItem}>
                        <span className={styles.statusLabel}>
                          Payment method
                        </span>
                        <span className={styles.statusValue}>
                          •••• •••• •••• 4242
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.subscriptionActions}>
                    <Link to="/plans" className={styles.changePlanButton}>
                      Change Plan
                    </Link>
                    <button className={styles.cancelSubscriptionButton}>
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.noSubscription}>
                  <p>You don't have an active subscription.</p>
                  <Link to="/plans" className={styles.subscribeCta}>
                    View Plans
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Viewing History</h2>
                <button className={styles.clearButton}>Clear History</button>
              </div>

              <div className={styles.historyList}>
                {viewingHistory.map((item) => (
                  <div key={item.id} className={styles.historyItem}>
                    <div className={styles.historyThumbnail}>
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                      />
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className={styles.historyDetails}>
                      <h4>{item.title}</h4>
                      <div className={styles.historyMeta}>
                        <span className={styles.historyDate}>
                          <Calendar size={14} />
                          {formatDate(item.watchedOn)}
                        </span>
                        <span className={styles.historyTime}>
                          <Clock size={14} />
                          {formatTime(item.watchedOn)}
                        </span>
                        <span className={styles.historyDuration}>
                          <Film size={14} />
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    <div className={styles.historyActions}>
                      <Link
                        to={`/watch/${item.id}`}
                        className={styles.watchAgainButton}
                      >
                        Watch Again
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Notification Settings</h2>
              </div>

              <div className={styles.notificationSettings}>
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Email Notifications</h4>
                    <p>Receive important updates via email</p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      name="notifications.email"
                      checked={formData.notifications.email}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>New Content Alerts</h4>
                    <p>Get notified when new movies or shows are added</p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      name="notifications.newContent"
                      checked={formData.notifications.newContent}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Recommendations</h4>
                    <p>Receive personalized content recommendations</p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      name="notifications.recommendations"
                      checked={formData.notifications.recommendations}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Playback Preferences</h2>
              </div>

              <div className={styles.preferencesSettings}>
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Autoplay</h4>
                    <p>Automatically play the next episode</p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      name="preferences.autoplay"
                      checked={formData.preferences.autoplay}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Subtitles</h4>
                    <p>Show subtitles by default</p>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      name="preferences.subtitles"
                      checked={formData.preferences.subtitles}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h4>Video Quality</h4>
                    <p>Select your preferred streaming quality</p>
                  </div>
                  <select
                    name="preferences.quality"
                    value={formData.preferences.quality}
                    onChange={handleInputChange}
                    className={styles.qualitySelect}
                  >
                    <option value="auto">Auto</option>
                    <option value="low">Low (480p)</option>
                    <option value="medium">Medium (720p)</option>
                    <option value="high">High (1080p)</option>
                    <option value="ultra">Ultra HD (4K)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Security Settings</h2>
              </div>

              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Current Password</label>
                  <div className={styles.passwordInput}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className={styles.passwordRequirements}>
                  <h4>Password Requirements:</h4>
                  <ul>
                    <li>At least 8 characters long</li>
                    <li>Include at least one uppercase letter</li>
                    <li>Include at least one number</li>
                    <li>Include at least one special character</li>
                  </ul>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.saveButton}>
                    Update Password
                  </button>
                </div>
              </form>

              <div className={styles.dangerZone}>
                <h3>Danger Zone</h3>
                <button className={styles.deleteAccountButton}>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;
