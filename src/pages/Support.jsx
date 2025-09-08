// pages/Support.jsx
import React, { useState } from 'react';

const Support = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Support Center</h1>
          <p>Find answers to common questions or get help from our support team</p>
        </div>

        <div className="support-categories">
          <div className="support-category">
            <div className="support-icon">
              <i className="fas fa-question-circle"></i>
            </div>
            <h3>FAQs</h3>
            <p>Find answers to frequently asked questions</p>
          </div>
          <div className="support-category">
            <div className="support-icon">
              <i className="fas fa-book"></i>
            </div>
            <h3>Guides</h3>
            <p>Step-by-step tutorials and how-to guides</p>
          </div>
          <div className="support-category">
            <div className="support-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Contact Support</h3>
            <p>Get in touch with our support team</p>
          </div>
        </div>

        <div className="page-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {[
            {
              question: "How long does it take to receive airtime?",
              answer: "Airtime is typically delivered instantly after payment confirmation. In rare cases, it may take up to 5 minutes due to network congestion."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept credit/debit cards, PayPal, bank transfers, and mobile money payments."
            },
            {
              question: "Can I get a refund if I made a mistake?",
              answer: "Refunds are available for unsuccessful transactions within 24 hours. Please contact our support team for assistance."
            }
          ].map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                {faq.question} <i className={`fas fa-${activeIndex === index ? 'minus' : 'plus'}`}></i>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;