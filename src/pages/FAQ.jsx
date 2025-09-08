// pages/FAQ.jsx
import React, { useState } from 'react';
import './LegalPages.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How long does it take to receive airtime?",
      answer: "Airtime is typically delivered instantly after payment confirmation. In rare cases, it may take up to 5 minutes due to network congestion."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, bank transfers, and mobile money payments. We're continuously adding new payment options to make the process more convenient for our customers."
    },
    {
      question: "Can I get a refund if I made a mistake?",
      answer: "Due to the digital nature of airtime, refunds are generally not provided for accidental purchases. However, if there was an error on our part, please contact our support team immediately for assistance."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your full credit card details on our servers."
    },
    {
      question: "Do you serve all mobile networks?",
      answer: "We currently support all major mobile networks. If you don't see your network listed, please contact us and we'll look into adding it."
    },
    {
      question: "Can I buy airtime for someone else?",
      answer: "Yes, you can purchase airtime for any mobile number. Just enter the recipient's number during checkout instead of your own."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we display all costs upfront. The price you see during checkout is the total amount you'll be charged."
    },
    {
      question: "What should I do if I don't receive my airtime?",
      answer: "First, check that you entered the correct mobile number. If the number is correct and you still haven't received the airtime after 10 minutes, please contact our support team with your transaction details."
    },
    {
      question: "Can I schedule airtime purchases for later?",
      answer: "Currently, we only support immediate purchases. However, we're working on adding scheduled purchases in a future update."
    },
    {
      question: "Is there a limit to how much airtime I can purchase?",
      answer: "Yes, for security reasons, we have daily and monthly purchase limits. These limits may vary based on your account verification status and payment method."
    }
  ];

  return (
    <div className="page-content">
      <div className="container">
        <div className="page-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services</p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question} <i className={`fas fa-${activeIndex === index ? 'minus' : 'plus'}`}></i>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="support-cta">
            <h2>Still have questions?</h2>
            <p>Our support team is here to help you with any questions or concerns you may have.</p>
            <a href="/contact" className="btn btn-primary">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;