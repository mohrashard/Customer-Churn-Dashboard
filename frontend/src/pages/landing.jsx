import { useEffect, useState } from "react"
import '../styles/RetentifyLanding.css';

const Retentify = () => {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["home", "about", "features", "pricing", "testimonials", "faq", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    {
      title: "Real-Time Churn Risk Scoring",
      description: "AI algorithms analyze customer behavior patterns to predict churn risk with 94% accuracy.",
      icon: "🎯",
      delay: "0.1s",
    },
    {
      title: "Smart Customer Segmentation",
      description: "Automatically categorize customers into risk segments for targeted retention strategies.",
      icon: "🔍",
      delay: "0.2s",
    },
    {
      title: "Automated Retention Playbooks",
      description: "Deploy proven retention workflows triggered by customer behavior and risk scores.",
      icon: "⚡",
      delay: "0.3s",
    },
    {
      title: "Advanced CRM Integration",
      description: "Seamlessly sync with Salesforce, HubSpot, and 50+ other platforms you already use.",
      icon: "🔗",
      delay: "0.4s",
    },
    {
      title: "Predictive Analytics Dashboard",
      description: "Visualize customer health scores and trends with interactive charts and reports.",
      icon: "📊",
      delay: "0.5s",
    },
    {
      title: "Custom Alert System",
      description: "Get instant notifications when customers show signs of potential churn.",
      icon: "🚨",
      delay: "0.6s",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 1,000 customers",
        "Basic churn prediction",
        "Email support",
        "Standard integrations",
        "Monthly reports",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10,000 customers",
        "Advanced AI predictions",
        "Priority support",
        "All integrations",
        "Real-time alerts",
        "Custom playbooks",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited customers",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee",
      ],
      popular: false,
    },
  ]

  const testimonials = [
    {
      quote:
        "Retentify helped us reduce churn by 47% in just 6 months. The AI insights are incredibly accurate and actionable.",
      author: "Sarah Chen",
      role: "VP of Customer Success, TechFlow",
      company: "TechFlow",
      delay: "0.1s",
    },
    {
      quote: "The automated playbooks saved our team 20 hours per week while improving retention rates by 35%.",
      author: "Marcus Rodriguez",
      role: "Head of Growth, DataVault",
      company: "DataVault",
      delay: "0.2s",
    },
    {
      quote: "Finally, a tool that predicts churn before it happens. Game-changing for our SaaS business.",
      author: "Emily Watson",
      role: "CEO, CloudSync",
      company: "CloudSync",
      delay: "0.3s",
    },
  ]

  const faqs = [
    {
      question: "How accurate is the churn prediction?",
      answer:
        "Our AI model achieves 94% accuracy in predicting customer churn, trained on millions of data points from successful SaaS companies.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Most customers see initial insights within 24 hours of setup, with significant retention improvements typically visible within 30-60 days.",
    },
    {
      question: "What integrations do you support?",
      answer:
        "We integrate with 50+ platforms including Salesforce, HubSpot, Stripe, Intercom, Zendesk, and all major CRM and support tools.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use enterprise-grade security with SOC 2 compliance, end-to-end encryption, and regular security audits.",
    },
    {
      question: "Can I customize the retention playbooks?",
      answer:
        "You can create custom playbooks, modify existing ones, and set up automated triggers based on your specific business needs.",
    },
  ]

  return (
    <div className="retentify-app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-placeholder">
              <img src="/placeholder.svg?height=40&width=40" alt="Retentify Logo" />
            </div>
            <span className="brand-text">Retentify</span>
          </div>
          <div className="nav-menu">
            {["Home", "About", "Features", "Pricing", "Testimonials", "FAQ", "Contact"].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`}
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="nav-cta" onClick={() => scrollToSection("contact")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Static Background */}
      <div className="static-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="float-dot dot-1"></div>
        <div className="float-dot dot-2"></div>
        <div className="float-dot dot-3"></div>
        <div className="float-dot dot-4"></div>
        <div className="float-dot dot-5"></div>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="brand-gradient">Retentify:</span>
                <br />
                Predict. Engage. Retain.
              </h1>
              <p className="hero-subtitle">
                Turn churn into growth using AI-powered customer insights. Identify at-risk customers before they leave
                and deploy automated retention strategies that actually work.
              </p>
              <div className="hero-cta">
                <button className="cta-primary glow-button" onClick={() => scrollToSection("contact")}>
                  Start Free Trial
                  <div className="button-glow"></div>
                </button>
                <button className="cta-secondary glass-button">Watch Demo</button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">94%</span>
                  <span className="stat-label">Prediction Accuracy</span>
                </div>
                <div className="stat">
                  <span className="stat-number">$2.4M</span>
                  <span className="stat-label">Revenue Saved</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="dashboard-3d">
                <div className="dashboard-mockup">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="mockup-content">
                    <div className="chart-placeholder">
                      <div className="chart-bar" style={{ height: "60%" }}></div>
                      <div className="chart-bar" style={{ height: "80%" }}></div>
                      <div className="chart-bar" style={{ height: "45%" }}></div>
                      <div className="chart-bar" style={{ height: "90%" }}></div>
                      <div className="chart-bar" style={{ height: "70%" }}></div>
                    </div>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-icon risk-high"></div>
                        <span>High Risk: 23</span>
                      </div>
                      <div className="metric-card">
                        <div className="metric-icon risk-medium"></div>
                        <span>Medium Risk: 67</span>
                      </div>
                      <div className="metric-card">
                        <div className="metric-icon risk-low"></div>
                        <span>Low Risk: 234</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="floating-cards">
                  <div className="floating-card card-1">
                    <div className="card-icon">📈</div>
                    <span>Revenue Growth</span>
                  </div>
                  <div className="floating-card card-2">
                    <div className="card-icon">🎯</div>
                    <span>Target Achieved</span>
                  </div>
                  <div className="floating-card card-3">
                    <div className="card-icon">⚡</div>
                    <span>Real-time Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Why Customer Retention Matters</h2>
              <p className="section-subtitle">
                Acquiring new customers costs 5x more than retaining existing ones. Yet most companies only discover
                churn after it's too late.
              </p>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <h3>5x</h3>
                  <p>Cost of acquiring vs retaining customers</p>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <h3>25%</h3>
                  <p>Revenue increase from 5% retention improvement</p>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏰</div>
                  <h3>90%</h3>
                  <p>Of churn happens without warning signs</p>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="cube-3d">
                <div className="cube-face front">AI</div>
                <div className="cube-face back">ML</div>
                <div className="cube-face right">Data</div>
                <div className="cube-face left">Insights</div>
                <div className="cube-face top">Predict</div>
                <div className="cube-face bottom">Retain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Customer Success</h2>
            <p className="section-subtitle">Everything you need to predict, prevent, and reduce customer churn</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card neumorphic-card" style={{ animationDelay: feature.delay }}>
                <div className="feature-icon-3d">
                  <span className="feature-emoji">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Choose the plan that fits your business needs</p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? "popular" : ""}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <div className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <span className="check-icon">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`pricing-cta ${plan.popular ? "primary" : "secondary"}`}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trusted by Industry Leaders</h2>
            <p className="section-subtitle">See how companies are saving millions with Retentify</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card glass-card" style={{ animationDelay: testimonial.delay }}>
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <span className="author-name">{testimonial.author}</span>
                    <span className="author-role">{testimonial.role}</span>
                    <span className="author-company">{testimonial.company}</span>
                  </div>
                </div>
                <div className="card-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about Retentify</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="cta-section">
        <div className="cta-background">
          <div className="cta-orb cta-orb-1"></div>
          <div className="cta-orb cta-orb-2"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Reduce Churn and Grow Revenue?</h2>
            <p className="cta-subtitle">
              Join thousands of companies using Retentify to predict churn, engage customers, and drive growth.
            </p>
            <div className="cta-form">
              <div className="form-group">
                <input type="email" placeholder="Enter your work email" className="email-input" />
                <button className="cta-button pulse-button">
                  Start Free Trial
                  <div className="pulse-ring"></div>
                </button>
              </div>
            </div>
            <p className="cta-note">No credit card required • 14-day free trial • Setup in 5 minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-placeholder">
                  <img src="/placeholder.svg?height=32&width=32" alt="Retentify Logo" />
                </div>
                <h3 className="brand-name">Retentify</h3>
              </div>
              <p className="brand-tagline">AI-Powered Customer Success Platform</p>
            </div>
            <div className="footer-links-grid">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#" className="footer-link">
                  Features
                </a>
                <a href="#" className="footer-link">
                  Pricing
                </a>
                <a href="#" className="footer-link">
                  Integrations
                </a>
                <a href="#" className="footer-link">
                  API
                </a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#" className="footer-link">
                  About
                </a>
                <a href="#" className="footer-link">
                  Careers
                </a>
                <a href="#" className="footer-link">
                  Blog
                </a>
                <a href="#" className="footer-link">
                  Press
                </a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#" className="footer-link">
                  Help Center
                </a>
                <a href="#" className="footer-link">
                  Contact
                </a>
                <a href="#" className="footer-link">
                  Status
                </a>
                <a href="#" className="footer-link">
                  Security
                </a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#" className="footer-link">
                  Privacy
                </a>
                <a href="#" className="footer-link">
                  Terms
                </a>
                <a href="#" className="footer-link">
                  Cookies
                </a>
                <a href="#" className="footer-link">
                  GDPR
                </a>
              </div>
            </div>
            <div className="footer-social">
              <div className="social-icon linkedin"></div>
              <div className="social-icon twitter"></div>
              <div className="social-icon github"></div>
            </div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <p>&copy; 2024 Retentify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Retentify
