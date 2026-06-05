import React, { useState } from 'react';
import './DonationsPage.css';

const DonationsPage = () => {
  const [copiedAccount, setCopiedAccount] = useState(null);

  const bankAccounts = [
    {
      id: 1,
      title: "Offerings & Tithes",
      emoji: "💰",
      description: "For general church offerings and tithes",
      bank: "Nedbank",
      accountNumber: "1127679295",
      branchCode: "123405",
      accountType: "Cheque Account",
      color: "#2e8f1a"
    },
    {
      id: 2,
      title: "Projects & Building Fund",
      emoji: "🏗️",
      description: "For building projects, renovations, and special initiatives",
      bank: "Capitec Bank",
      accountNumber: "1304080550",
      branchCode: "470010",
      accountType: "Savings Account",
      color: "#2c5eb8"
    },
    {
      id: 3,
      title: "Gift for Prophet",
      emoji: "🙏",
      description: "Personal love offering for the Man of God",
      bank: "Absa Bank",
      accountNumber: "9407606369",
      branchCode: "632005",
      accountType: "Cheque Account",
      color: "#c41e3a"
    }
  ];

  const copyToClipboard = async (text, accountId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(accountId);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contributions</h1>
        <p>Your generosity helps us spread the Gospel and serve our community</p>
      </div>

      <div className="container">
        {/* Scripture Verse at Top */}
        <div className="scripture-banner">
          <p className="scripture-quote">"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."</p>
          <p className="scripture-verse">— 2 Corinthians 9:7</p>
        </div>

        {/* Bank Accounts Grid */}
        <div className="accounts-grid">
          {bankAccounts.map((account) => (
            <div key={account.id} className="account-card" style={{ borderTopColor: account.color }}>
              <div className="account-header" style={{ background: `${account.color}10` }}>
                <span className="account-icon">{account.emoji}</span>
                <h3>{account.title}</h3>
              </div>
              <p className="account-description">{account.description}</p>
              
              <div className="account-details">
                <div className="detail-row">
                  <span className="detail-label">Bank:</span>
                  <span className="detail-value">{account.bank}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Account Number:</span>
                  <button 
                    className="copyable-value"
                    onClick={() => copyToClipboard(account.accountNumber, `${account.id}-number`)}
                  >
                    <span className="detail-value account-num">{account.accountNumber}</span>
                    <span className="copy-icon">
                      {copiedAccount === `${account.id}-number` ? '✓' : ''}
                    </span>
                  </button>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Branch Code:</span>
                  <button 
                    className="copyable-value"
                    onClick={() => copyToClipboard(account.branchCode, `${account.id}-branch`)}
                  >
                    <span className="detail-value">{account.branchCode}</span>
                    <span className="copy-icon">
                      {copiedAccount === `${account.id}-branch` ? '✓' : ''}
                    </span>
                  </button>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Account Type:</span>
                  <span className="detail-value">{account.accountType}</span>
                </div>
              </div>

              <div className="reference-note">
                <strong>📝 Reference:</strong> Your Name and Surname
              </div>
            </div>
          ))}
        </div>

        {/* Important Instructions */}
        <div className="instructions-card">
          <h3>📌 Important Information</h3>
          <div className="instructions-grid">
            <div className="instruction-item">
              <span className="instruction-icon">✓</span>
              <p>Use <strong>your Name and Surname</strong> as reference for all accounts</p>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">📧</span>
              <p>Send proof of payment to: <strong>adminnjcamministries@gmail.com</strong></p>
            </div>
            <div className="instruction-item">
              <span className="instruction-icon">💝</span>
              <p>Thank you for your generous heart! God bless you abundantly</p>
            </div>
          </div>
        </div>

        {/* Impact Message */}
        <div className="impact-message">
          <div className="impact-content">
            <h3>Your Giving Makes a Difference</h3>
            <p>Your generous contributions help us reach more souls with the Gospel, support community outreach programs, maintain our worship facilities, and develop youth and children's ministries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsPage;