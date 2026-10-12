import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatsappIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M11.42 21.814a9.642 9.642 0 0 1-4.92-1.344l-.353-.209-3.66.96.979-3.57-.23-.365a9.637 9.637 0 0 1-1.474-5.148c0-5.32 4.331-9.652 9.658-9.652 2.58 0 5.006 1.006 6.83 2.83 1.825 1.823 2.83 4.25 2.83 6.831 0 5.318-4.331 9.652-9.658 9.652v.015h-.001Zm4.936-6.666c-.27-.135-1.603-.791-1.85-.881-.246-.09-.426-.135-.606.135-.18.27-.698.881-.855 1.06-.157.18-.315.203-.585.068-.27-.135-1.144-.422-2.178-1.343-.804-.718-1.346-1.605-1.503-1.875-.157-.27-.017-.417.118-.552.12-.12.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.338-.023-.473-.067-.135-.606-1.464-.83-2.003-.218-.526-.44-.454-.606-.462-.157-.008-.337-.01-.518-.01-.18 0-.472.067-.72.337-.247.27-.945.922-.945 2.25 0 1.328.968 2.61 1.103 2.79.135.18 1.902 2.902 4.608 4.07 1.918.825 2.273.66 2.678.62.405-.04 1.305-.532 1.485-1.045.18-.513.18-.952.126-1.045-.054-.093-.203-.138-.473-.273Z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
import "./ContactExperience.css";

export default function ContactExperience() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          cardsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .fromTo(
          formRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, loading, sent, success_modal, error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }

    if (e.target.tagName.toLowerCase() === "textarea") {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.phone.trim())
      newErrors.phone = "Please enter your phone number.";
    if (!formData.message.trim())
      newErrors.message = "Please tell us about your inquiry.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Smoothly scroll and focus first invalid field
      const firstInvalidId = Object.keys(newErrors)[0];
      const el = document.getElementById(firstInvalidId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => el.focus(), 300);
      }
      return;
    }

    setStatus("loading");

    const submissionData = {
      ...formData,
      access_key: "33d493b6-edfa-4ca6-b6a1-f4019dfbf113", // Replace with actual key for gbassi580@gmail.com
      subject: "New Inquiry – Unified Amines Website",
      submission_time: new Date().toLocaleString(),
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        setTimeout(() => {
          setStatus("success_modal");
        }, 400);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="section contact-section" ref={sectionRef}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title" ref={titleRef}>
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="contact-desc" ref={descRef}>
              Ready to elevate your chemical supply chain? Reach out to our
              global team of experts.
            </p>

            <div className="info-cards">
              <div
                className="info-card glass-panel"
                ref={(el) => (cardsRef.current[0] = el)}
              >
                <Mail className="info-icon" />
                <div>
                  <h4>Email Us</h4>
                  <p>gaurav@gmail.com</p>
                </div>
              </div>
              <div
                className="info-card glass-panel"
                ref={(el) => (cardsRef.current[1] = el)}
              >
                <Phone className="info-icon" />
                <div>
                  <h4>Call Us</h4>
                  <p>+91 123-45678</p>
                </div>
              </div>
              <div
                className="info-card glass-panel"
                ref={(el) => (cardsRef.current[2] = el)}
              >
                <MapPin className="info-icon" />
                <div>
                  <h4>Headquarters</h4>
                  <p>Global Industrial Park, Sector 7</p>
                </div>
              </div>

              <div
                className="info-card glass-panel social-connection-card"
                ref={(el) => (cardsRef.current[3] = el)}
              >
                <div className="social-connection-content">
                  <h4>Connect With Us</h4>
                  <div className="social-links">
                    <a href="#" className="social-link">
                      <LinkedinIcon className="social-icon" />
                      <span>LinkedIn</span>
                    </a>
                    <a href="#" className="social-link">
                      <WhatsappIcon className="social-icon whatsapp" />
                      <span>WhatsApp</span>
                    </a>
                    <a href="#" className="social-link">
                      <InstagramIcon className="social-icon" />
                      <span>Instagram</span>
                    </a>
                    <a href="#" className="social-link">
                      <TwitterIcon className="social-icon" />
                      <span>X (Twitter)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form glass-panel" ref={formRef}>
            <h3 className="form-title">Send an Inquiry</h3>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  className={errors.name ? "invalid" : ""}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  disabled={status === "loading" || status === "sent"}
                />
                <label htmlFor="name">Full Name</label>
                <div className="input-border"></div>
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className={errors.email ? "invalid" : ""}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  disabled={status === "loading" || status === "sent"}
                />
                <label htmlFor="email">Email Address</label>
                <div className="input-border"></div>
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder=" "
                  disabled={status === "loading" || status === "sent"}
                />
                <label htmlFor="company">Company (Optional)</label>
                <div className="input-border"></div>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="phone"
                  className={errors.phone ? "invalid" : ""}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  disabled={status === "loading" || status === "sent"}
                />
                <label htmlFor="phone">Phone Number</label>
                <div className="input-border"></div>
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  rows="1"
                  className={errors.message ? "invalid" : ""}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  disabled={status === "loading" || status === "sent"}
                ></textarea>
                <label htmlFor="message">Message / Product Inquiry</label>
                <div className="input-border"></div>
                {errors.message && (
                  <span className="error-text">{errors.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="submit-btn magnetic-btn primary-btn"
                disabled={status === "loading" || status === "sent"}
                style={
                  status === "loading" || status === "sent"
                    ? { opacity: 0.7, cursor: "not-allowed" }
                    : {}
                }
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="spinner" />
                    <span>Sending...</span>
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Sent</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {status === "success_modal" && (
        <div className="premium-modal-overlay">
          <div className="premium-modal success-modal glass-panel">
            <div className="modal-icon-wrapper">
              <CheckCircle2 className="modal-icon success-icon" size={64} />
            </div>
            <h3 className="success-heading">Inquiry Sent Successfully</h3>
            <div className="success-personalized">
              <div
                className="sp-line1"
                style={{
                  fontSize:
                    formData.name.trim().length > 18
                      ? "22px"
                      : formData.name.trim().length > 12
                        ? "24px"
                        : "26px",
                }}
              >
                Thank You
                {formData.name.trim() ? `, ${formData.name.trim()}` : ""}
              </div>
              <div className="sp-line2">
                For Contacting <span className="sp-brand">Unified Amines</span>
              </div>
            </div>
            <p className="success-body">
              We've successfully received your inquiry.
              <br />
              Our team will review your request and get back to you within{" "}
              <strong>24 business hours.</strong>
            </p>
            <button
              className="magnetic-btn primary-btn success-btn"
              onClick={() => {
                setStatus("idle");
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  phone: "",
                  message: "",
                });
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="premium-modal-overlay">
          <div className="premium-modal glass-panel">
            <XCircle className="modal-icon error-icon" size={48} />
            <h3>Unable to Send Inquiry</h3>
            <p>Something went wrong while sending your inquiry.</p>
            <p>Please try again in a few moments.</p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1.5rem",
                width: "100%",
              }}
            >
              <button
                className="magnetic-btn primary-btn"
                onClick={handleSubmit}
                style={{ flex: 1, justifyContent: "center" }}
              >
                Try Again
              </button>
              <button
                className="magnetic-btn secondary-btn"
                onClick={() => setStatus("idle")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
