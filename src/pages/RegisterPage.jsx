"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check } from "lucide-react";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    // Password strength checker
    if (formData.password) {
      let strength = 0;

      // Length check
      if (formData.password.length >= 8) strength += 1;

      // Contains number
      if (/\d/.test(formData.password)) strength += 1;

      // Contains lowercase
      if (/[a-z]/.test(formData.password)) strength += 1;

      // Contains uppercase
      if (/[A-Z]/.test(formData.password)) strength += 1;

      // Contains special char
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;

      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement
    if (!agreeToTerms) {
      errors.terms = "You must agree to the Terms of Service";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user registration - in real app, this would be an API call
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if user already exists
      if (users.find((u) => u.email === formData.email)) {
        setError("User with this email already exists");
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // In real app, this would be hashed
        createdAt: new Date().toISOString(),
        subscription: {
          plan: "free",
          status: "active",
        },
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Store user session
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
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

    // Clear error when user types
    if (isSubmitted) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validate first step
    if (currentStep === 1) {
      const errors = {};

      if (!formData.name) {
        errors.name = "Name is required";
      }

      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email address is invalid";
      }

      setFormErrors(errors);

      if (Object.keys(errors).length === 0) {
        setCurrentStep(2);
        setIsSubmitted(false);
      }
    }
  };

  const prevStep = (e) => {
    e.preventDefault();
    setCurrentStep(1);
    setIsSubmitted(false);
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
            <h1 className="auth-card-title">Create Account</h1>
            <p className="auth-card-description">
              Join CineStream to start streaming premium content
            </p>
          </div>

          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? "active-step" : ""}`}>
              <div className="step-number">1</div>
              <span className="step-label">Account</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${currentStep >= 2 ? "active-step" : ""}`}>
              <div className="step-number">2</div>
              <span className="step-label">Security</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert-error">
                <p>{error}</p>
              </div>
            )}

            {currentStep === 1 ? (
              <>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <div
                    className={`form-input-wrapper ${
                      formErrors.name ? "input-error" : ""
                    }`}
                  >
                    <User className="form-input-icon" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="error-text">{formErrors.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div
                    className={`form-input-wrapper ${
                      formErrors.email ? "input-error" : ""
                    }`}
                  >
                    <Mail className="form-input-icon" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="error-text">{formErrors.email}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="submit-button"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div
                    className={`form-input-wrapper ${
                      formErrors.password ? "input-error" : ""
                    }`}
                  >
                    <Lock className="form-input-icon" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="error-text">{formErrors.password}</p>
                  )}

                  <div className="password-strength">
                    <div className="strength-bars">
                      <div
                        className={`strength-bar ${
                          passwordStrength >= 1 ? "strength-weak" : ""
                        }`}
                      ></div>
                      <div
                        className={`strength-bar ${
                          passwordStrength >= 2 ? "strength-fair" : ""
                        }`}
                      ></div>
                      <div
                        className={`strength-bar ${
                          passwordStrength >= 3 ? "strength-good" : ""
                        }`}
                      ></div>
                      <div
                        className={`strength-bar ${
                          passwordStrength >= 4 ? "strength-strong" : ""
                        }`}
                      ></div>
                      <div
                        className={`strength-bar ${
                          passwordStrength >= 5 ? "strength-very-strong" : ""
                        }`}
                      ></div>
                    </div>
                    <span className="strength-label">
                      {passwordStrength === 0 && "Password strength"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Fair"}
                      {passwordStrength === 3 && "Good"}
                      {passwordStrength === 4 && "Strong"}
                      {passwordStrength === 5 && "Very strong"}
                    </span>
                  </div>

                  <div className="password-requirements">
                    <div
                      className={`requirement ${
                        formData.password.length >= 8 ? "requirement-met" : ""
                      }`}
                    >
                      {formData.password.length >= 8 ? (
                        <Check size={14} />
                      ) : (
                        <span className="requirement-dot"></span>
                      )}
                      <span>At least 8 characters</span>
                    </div>
                    <div
                      className={`requirement ${
                        /[A-Z]/.test(formData.password) ? "requirement-met" : ""
                      }`}
                    >
                      {/[A-Z]/.test(formData.password) ? (
                        <Check size={14} />
                      ) : (
                        <span className="requirement-dot"></span>
                      )}
                      <span>One uppercase letter</span>
                    </div>
                    <div
                      className={`requirement ${
                        /\d/.test(formData.password) ? "requirement-met" : ""
                      }`}
                    >
                      {/\d/.test(formData.password) ? (
                        <Check size={14} />
                      ) : (
                        <span className="requirement-dot"></span>
                      )}
                      <span>One number</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div
                    className={`form-input-wrapper ${
                      formErrors.confirmPassword ? "input-error" : ""
                    }`}
                  >
                    <Lock className="form-input-icon" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="password-toggle"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="error-text">{formErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="checkbox-wrapper">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="checkbox"
                  />
                  <label htmlFor="terms" className="checkbox-label">
                    I agree to the{" "}
                    <Link to="/terms" className="auth-footer-link">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="auth-footer-link">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {formErrors.terms && (
                  <p className="error-text">{formErrors.terms}</p>
                )}

                <div className="button-group">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="back-step-button"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                  >
                    {loading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/login" className="auth-footer-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
