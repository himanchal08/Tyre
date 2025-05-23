"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Store user session
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@example.com",
      password: "demo1234",
    });

    // Create demo user if it doesn't exist
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users.find((u) => u.email === "demo@example.com")) {
      const demoUser = {
        id: "demo-user",
        name: "Demo User",
        email: "demo@example.com",
        password: "demo1234",
        createdAt: new Date().toISOString(),
        subscription: {
          plan: "premium",
          status: "active",
          nextBilling: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      };
      users.push(demoUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-background-overlay"></div>
      </div>

      <div className="auth-container">
        <Link to="/" className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="auth-card">
          <div className="auth-logo">
            <span className="logo-text">CineStream</span>
          </div>

          <div className="auth-card-header">
            <h1 className="auth-card-title">Welcome Back</h1>
            <p className="auth-card-description">
              Sign in to continue to your CineStream account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert-error">
                <p>{error}</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="form-input-wrapper">
                <Mail className="form-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-flex">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>
              <div className="form-input-wrapper">
                <Lock className="form-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="checkbox-wrapper">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox"
              />
              <label htmlFor="remember-me" className="checkbox-label">
                Remember me for 30 days
              </label>
            </div>

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? <span className="loading-spinner"></span> : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/register" className="auth-footer-link">
                Sign up
              </Link>
            </p>
          </div>

          <div className="divider">
            <span className="divider-text">Or</span>
          </div>

          <button className="demo-button" onClick={handleDemoLogin}>
            Try Demo Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
