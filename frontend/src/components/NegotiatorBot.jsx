import React, { useState, useEffect, useRef } from 'react';
import './NegotiatorBot.css';

const NegotiatorBot = ({ isOpen, onClose, product }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: `Hi! I'm your OmniCommerce AI Negotiator. I see you're interested in the ${product?.name || 'this item'}. The current price is ₹${product?.price || '4,500'}. What's your target price?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Negotiation Logic
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse.text, action: botResponse.action }]);
    }, 1500);
  };

  const getBotResponse = (input) => {
    const val = parseFloat(input.replace(/[^0-9.]/g, ''));
    const currentPrice = product?.price || 895;

    if (isNaN(val)) {
      return { text: "I'm sorry, I didn't catch a specific price. What offer would you like to make?" };
    }

    if (val < currentPrice * 0.6) {
      return { text: `That's a bit too low for a single unit. However, if you increase your order to 5 units, I can drop the unit price to ₹${(currentPrice * 0.75).toFixed(2)}. Would you like to see a bulk quote?`, action: 'bulk_tier' };
    } else if (val < currentPrice * 0.9) {
      return { text: `I can't quite do ₹${val}, but I can meet you at ₹${(currentPrice * 0.92).toFixed(2)} right now if you complete the purchase in the next 10 minutes. Deal?`, action: 'counter_offer' };
    } else {
      return { text: `That sounds like a fair starting point. I've sent your offer of ₹${val} to the seller for instant approval. I'll notify you the moment they respond!`, action: 'sent' };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bot-overlay">
      <div className="bot-window">
        <header className="bot-header">
          <div className="bot-identity">
            <div className="bot-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6v6l4 2"></path></svg>
            </div>
            <div>
              <strong>OmniNegotiator AI</strong>
              <p>● Always Active</p>
            </div>
          </div>
          <button className="close-bot-btn" onClick={onClose}>×</button>
        </header>

        <div className="bot-chat-area" ref={scrollRef}>
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble-wrap ${msg.type}`}>
              <div className="chat-bubble">
                {msg.text}
                {msg.action === 'bulk_tier' && (
                  <div className="bot-action-card">
                    <div className="tier-viz">
                      <div className="tier active">1-2 units: ₹4,500</div>
                      <div className="tier highlighted">3-5 units: ₹3,800</div>
                    </div>
                    <button className="btn-apply-tier">Apply Bulk Tier</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble-wrap bot">
              <div className="chat-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className="bot-input-area">
          <input 
            type="text" 
            placeholder="Type your offer or question..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-msg-btn" onClick={handleSend}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
        
        <footer className="bot-footer">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
           Smart Contract Secured Negotiation
        </footer>
      </div>
    </div>
  );
};

export default NegotiatorBot;
