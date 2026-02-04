import React, { useEffect, useState } from "react";
import "../styles/SubscriptionPage.css";
import {
  Crown,
  Check,
  X,
  Calendar,
  CreditCard,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// 🔹 dummy data (backend connect hone ke baad remove kar dena)
const FREE_TIER = {
  id: "free",
  name: "Free",
  description: "Basic career tools",
  features: ["Limited quizzes", "Basic recommendations"],
  color: "cyan",
};

export default function SubscriptionPage() {
  const navigate = useNavigate();

  const [user] = useState(true); // 🔴 auth context ke baad replace
  const [loading, setLoading] = useState(false);

  const [subscription, setSubscription] = useState({
    tier: "premium",
    status: "active",
    billing: "monthly",
    currentPeriodEnd: new Date().toISOString(),
    cancelAtPeriodEnd: false,
  });

  const currentTier =
    subscription?.tier === "premium"
      ? {
          id: "premium",
          name: "Premium",
          description: "Advanced career guidance",
          features: [
            "Unlimited quizzes",
            "AI career roadmap",
            "Resume analyzer",
          ],
          color: "purple",
        }
      : FREE_TIER;

  const isCanceled = subscription?.cancelAtPeriodEnd;

  if (!user) {
    return (
      <div className="sub-center">
        <h2>Access Denied</h2>
        <button onClick={() => navigate("/login")}>Sign In</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="sub-center">
        <RefreshCw className="spin" />
        <p>Loading subscription...</p>
      </div>
    );
  }

  return (
    <div className="subscription-page">
      {/* Header */}
      <div className="sub-header">
        <div className="badge">
          <Crown size={18} />
          <span>Subscription Management</span>
        </div>

        <h1>
          Your Career <span>Plan</span>
        </h1>
        <p>Manage your subscription and upgrade your plan</p>
      </div>

      {/* Current Plan */}
      <div className="plan-card">
        <div className="plan-top">
          <div className="plan-info">
            <div className="plan-icon">
              {currentTier.id === "premium" ? <Zap /> : <Star />}
            </div>
            <div>
              <h2>{currentTier.name}</h2>
              <p>{currentTier.description}</p>
            </div>
          </div>

          <span className="status active">Active</span>
        </div>

        {/* Details */}
        <div className="plan-details">
          <div className="detail-box">
            <Calendar size={16} />
            <div>
              <small>Billing</small>
              <p>{subscription.billing}</p>
            </div>
          </div>

          <div className="detail-box">
            <CreditCard size={16} />
            <div>
              <small>Next Payment</small>
              <p>
                {new Date(
                  subscription.currentPeriodEnd
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <h3>Current Plan Features</h3>
        <div className="features">
          {currentTier.features.map((f, i) => (
            <div key={i} className="feature">
              <Check size={16} />
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="actions">
          <button className="primary" onClick={() => navigate("/pricing")}>
            Upgrade Plan <ArrowRight size={16} />
          </button>

          {!isCanceled ? (
            <button className="danger">
              <X size={16} /> Cancel Subscription
            </button>
          ) : (
            <button className="success">
              <RefreshCw size={16} /> Reactivate
            </button>
          )}

          <button className="secondary" onClick={() => navigate("/pricing")}>
            View All Plans
          </button>
        </div>

        {/* Warning */}
        {isCanceled && (
          <div className="warning">
            <AlertTriangle />
            <p>Your subscription will end soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
