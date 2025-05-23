"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import styles from "./PlanCards.module.css";

const plans = [
  {
    id: "day",
    name: "Day Pass",
    price: "₹9",
    period: "1 day",
    durationMs: 24 * 60 * 60 * 1000,
    features: [
      { text: "Full HD streaming", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Access all premium content", included: true },
      { text: "Watch on any device", included: true },
      { text: "Download for offline viewing", included: false },
      { text: "Priority customer support", included: false },
    ],
    popular: false,
    color: "var(--color-blue-500)",
  },
  {
    id: "three-day",
    name: "Weekend Pass",
    price: "₹29",
    period: "3 days",
    durationMs: 3 * 24 * 60 * 60 * 1000,
    features: [
      { text: "Full HD streaming", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Access all premium content", included: true },
      { text: "Watch on any device", included: true },
      { text: "Download for offline viewing", included: true },
      { text: "Priority customer support", included: false },
    ],
    popular: true,
    color: "var(--color-purple-600)",
  },
  {
    id: "week",
    name: "Week Pass",
    price: "₹69",
    period: "7 days",
    durationMs: 7 * 24 * 60 * 60 * 1000,
    features: [
      { text: "Full HD streaming", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Access all premium content", included: true },
      { text: "Watch on any device", included: true },
      { text: "Download for offline viewing", included: true },
      { text: "Priority customer support", included: true },
    ],
    popular: false,
    color: "var(--color-green-500)",
  },
];

function PlanCards() {
  const [selectedPlan, setSelectedPlan] = useState("standard");

  return (
    <section className={styles.plansSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          Choose Your <span className={styles.titleHighlight}>Plan</span>
        </h2>
        <p className={styles.sectionDescription}>
          Select the perfect plan for your streaming needs. Upgrade or downgrade
          anytime.
        </p>

        <div className={styles.plansContainer}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${
                selectedPlan === plan.id ? styles.selectedPlan : ""
              } ${plan.popular ? styles.popularPlan : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                "--plan-color": plan.color,
              }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}

              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>/{plan.period}</span>
                </div>
              </div>

              <ul className={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`${styles.featureItem} ${
                      !feature.included ? styles.disabledFeature : ""
                    }`}
                  >
                    {feature.included ? (
                      <Check size={18} className={styles.featureIcon} />
                    ) : (
                      <X size={18} className={styles.featureIconDisabled} />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.planFooter}>
                <Link to="/register" className={styles.selectButton}>
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlanCards;
