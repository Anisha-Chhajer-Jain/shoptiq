import React, { useState } from 'react';
import './Deals.css';

const conversations = [
  {
    id: 1,
    title: 'Inquiry about Swift-Co...',
    preview: 'Can we adjust the bulk pricing for 50...',
    time: '12:45 PM',
    unread: true,
    avatar: 'M',
    avatarColor: '#3182ce',
  },
  {
    id: 2,
    title: 'Negotiation for Audio-...',
    preview: 'The shipping terms are acceptable for...',
    time: '09:12 AM',
    unread: false,
    avatar: 'R',
    avatarColor: '#805ad5',
  },
  {
    id: 3,
    title: 'Logistics Support',
    preview: 'Tracking ID #99821-X has been updat...',
    time: 'Yesterday',
    unread: false,
    avatar: 'L',
    avatarColor: '#38a169',
  },
];

const messages = [
  {
    id: 1,
    sender: 'them',
    text: 'Hello Alex, we are reviewing the technical specs for the Swift-Core Gen.3. Our infrastructure team needs to confirm the PoE+ budget per port before we commit to the 500 unit order.',
    time: '12:42 PM',
  },
  {
    id: 2,
    sender: 'me',
    text: "Of course. I've attached the full data sheet. The Gen.3 supports up to 30W per port with a total power budget of 740W. Let me know if that fits your requirements.",
    time: '12:45 PM',
  },
];

const Deals = () => {
  const [activeConv, setActiveConv] = useState(1);
  const [msgTab, setMsgTab] = useState('Active');
  const [newMsg, setNewMsg] = useState('');

  return (
    <div className="deals-container">
      {/* Sidebar: Conversations */}
      <div className="deals-sidebar">
        <div className="deals-sidebar-header">
          <div className="deals-sidebar-title">
            Messages
            <button className="compose-btn" title="Compose">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
          </div>
          <div className="msg-tabs">
            {['Active', 'Archive'].map(tab => (
              <button key={tab}
                className={`msg-tab ${msgTab === tab ? 'active' : ''}`}
                onClick={() => setMsgTab(tab)}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="conv-list">
          {conversations.map(conv => (
            <div key={conv.id}
              className={`conv-item ${activeConv === conv.id ? 'active' : ''}`}
              onClick={() => setActiveConv(conv.id)}>
              <div className="conv-avatar" style={{ background: conv.avatarColor }}>{conv.avatar}</div>
              <div className="conv-info">
                <div className="conv-title-row">
                  <span className="conv-name">{conv.title}</span>
                  <span className="conv-time">{conv.time}</span>
                </div>
                <div className="conv-preview">{conv.preview}</div>
              </div>
              {conv.unread && <span className="conv-unread-dot"></span>}
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="deals-user-profile">
          <div className="deals-user-avatar">AS</div>
          <div>
            <div className="deals-user-name">Alex Sterling</div>
            <div className="deals-user-role">ADMIN</div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="deals-chat">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-product">
            <div className="chat-product-img"></div>
            <div>
              <div className="chat-product-name">Swift-Core Enterprise Hub Gen.3</div>
              <div className="chat-product-meta">
                <span className="chat-stock-badge">IN STOCK</span>
                ₹1,299.00 / Unit
              </div>
            </div>
          </div>
          <button className="create-quote-btn">Create Quote</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          <div className="chat-date-divider">WEDNESDAY, MAY 24</div>

          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.sender}`}>
              <div className="msg-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Attachment */}
          <div className="chat-msg me">
            <div className="msg-attachment">
              <div className="attachment-icon">📄</div>
              <div>
                <div className="attachment-name">Swift-Core_G3_Spec_Sheet.pdf</div>
                <div className="attachment-size">2.4 MB • PDF DOCUMENT</div>
              </div>
              <button className="attachment-dl" title="Download">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
            </div>
          </div>

          <div className="typing-indicator">• • • Marc is typing...</div>
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-row">
            <button className="chat-action-btn" title="Attach">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            </button>
            <button className="chat-action-btn" title="Image">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
            />
            <button className="chat-action-btn">😊</button>
            <button className="chat-send-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <div className="chat-shortcuts">
            <span>⚡ QUICK REPLIES</span>
            <span>📋 INSERT CONTRACT</span>
            <span className="chat-encryption">Shoptiq Professional Secure Messaging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
