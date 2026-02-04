import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, ShieldCheck, CreditCard, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Free trial redirect
import "../styles/SimplePricingPage.css";
import Footer from "../components/Footer";


const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Perfect for students and beginners",
    monthly: 9.99,
    quarterly: 24.99,
    features: [
      "AI Career Chatbot",
      "Basic Career Assessment",
      "College Database Access",
      "Email Support",
    ],
    icon: Star,
    color: "blue",
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "Ideal for professionals",
    monthly: 19.99,
    quarterly: 49.99,
    features: [
      "Everything in Basic",
      "AI Roadmap Generator",
      "Unlimited Roadmaps",
      "Priority Support",
    ],
    icon: Zap,
    color: "purple",
    popular: true,
  },
  {
    id: "elite",
    name: "Elite Plan",
    description: "For power users and enterprises",
    monthly: 39.99,
    quarterly: 99.99,
    features: [
      "Everything in Premium",
      "ChatGPT-5 & Gemini Pro",
      "Brock AI Assistant",
      "24/7 Support",
    ],
    icon: Crown,
    color: "gold",
  },
];

export default function SimplePricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const handleSubscribe = (planId) => {
    alert(`Subscribe to ${planId} plan – payment coming soon`);
  };

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        {/* HEADER */}
        <div className="pricing-header">
          <h1>
            Unlock Your <span>Career Potential</span>
          </h1>
          <p>
            From personalized AI guidance to advanced career roadmaps, choose
            the perfect plan to accelerate your professional growth
          </p>

          {/* BILLING TOGGLE */}
          <div className="billing-toggle">
            <button
              className={billingCycle === "monthly" ? "active" : ""}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>

            <button
              className={billingCycle === "quarterly" ? "active" : ""}
              onClick={() => setBillingCycle("quarterly")}
            >
              Quarterly
              <span className="save-badge">Save 25%</span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="pricing-grid">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = plan[billingCycle];
            const savings =
              billingCycle === "quarterly"
                ? plan.monthly * 3 - plan.quarterly
                : 0;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <div className={`plan-icon ${plan.color}`}>
                  <Icon size={32} />
                </div>

                <h3>{plan.name}</h3>
                <p className="plan-desc">{plan.description}</p>

                <div className="price-box">
                  <span className="price">${price.toFixed(2)}</span>
                  <span className="cycle">
                    /{billingCycle === "quarterly" ? "3 months" : "month"}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="savings">
                    Save ${savings.toFixed(2)} (25% off)
                  </div>
                )}

                <div className="features">
                  {plan.features.map((f, i) => (
                    <div key={i} className="feature">
                      <span className={`check ${plan.color}`}>
                        <Check size={12} />
                      </span>
                      {f}
                    </div>
                  ))}
                </div>

                <button
                  className={`subscribe-btn ${plan.popular ? "primary" : ""}`}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Get Started
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* =================== FREE TRIAL SECTION =================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="free-trial-card"
        >
          <h3 className="free-title">Try Free First</h3>
          <p className="free-desc">
            Explore our platform with limited access to all features
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Check size={16} className="text-neon-cyan" />
              <span className="text-gray-300 text-sm">
                Limited AI Career Chatbot (10 messages/day)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check size={16} className="text-neon-cyan" />
              <span className="text-gray-300 text-sm">
                Sample Learning Resources
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check size={16} className="text-neon-cyan" />
              <span className="text-gray-300 text-sm">
                Basic Career Assessment Quiz
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check size={16} className="text-neon-cyan" />
              <span className="text-gray-300 text-sm">Basic Dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check size={16} className="text-neon-cyan" />
              <span className="text-gray-300 text-sm">
                View College Database (Limited)
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/auth/signup")}
            className="start-free-btn"
          >
            Start Free Trial
          </button>
        </motion.div>

       {/* =================== TRUST & FAQ SECTION =================== */}
        <motion.div
          className="trust-faq-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* TRUST ICONS */}
          <div className="trust-icons">
            <div className="trust-item">
              <div className="icon-circle green">
                <ShieldCheck size={24} />
              </div>
              <h4>Secure Payments</h4>
              <p>Enterprise-grade security with SSL encryption</p>
            </div>
            <div className="trust-item">
              <div className="icon-circle blue">
                <CreditCard size={24} />
              </div>
              <h4>Flexible Billing</h4>
              <p>Cancel anytime, no hidden fees</p>
            </div>
            <div className="trust-item">
              <div className="icon-circle purple">
                <Clock size={24} />
              </div>
              <h4>30-Day Guarantee</h4>
              <p>Full refund if you're not satisfied</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-grid">
              <div className="faq-item">
                <h5>Can I upgrade or downgrade anytime?</h5>
                <p>
                  Yes, you can change your plan at any time. Upgrades are immediate,
                  and downgrades take effect at the next billing cycle.
                </p>
              </div>
              <div className="faq-item">
                <h5>What payment methods do you accept?</h5>
                <p>
                  We accept all major credit cards, debit cards, and digital wallets
                  through Stripe and Razorpay.
                </p>
              </div>
              <div className="faq-item">
                <h5>Is there a free trial?</h5>
                <p>
                  Yes, you can try our platform for free with limited features. No
                  credit card required for the free tier.
                </p>
              </div>
              <div className="faq-item">
                <h5>What's included in Elite Plan AI models?</h5>
                <p>
                  Elite members get access to ChatGPT-5, Gemini Pro, and our
                  specialized Brock AI career coach for personalized guidance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* =================== FOOTER =================== */}
      <Footer />

    </div>
  );
}
