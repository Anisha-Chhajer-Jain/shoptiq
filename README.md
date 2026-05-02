# 💎 Shoptiq — The Future of Unified Commerce

> **Shopping, Exactly How You Expect It.**  
> A premium, full-stack enterprise e-commerce ecosystem built for dynamic pricing, visual fidelity, and collective bargaining.

---

## 🔗 Live Deployment & Resources

| Resource | Status | Link |
|---|---|---|
| 🌐 **Frontend Live** | Pending Deployment | [Deploy on Vercel](#) |
| ⚙️ **Backend API** | Pending Deployment | [Deploy on Render](#) |
| 🎨 **UI Design** | 3D Interactive UI | Local CSS Architecture |

---

## ✨ Core Pillars of Shoptiq

### 💬 1. Dynamic Negotiation Hub
Unlike traditional "static price" platforms, Shoptiq allows buyers to initiate live negotiations for volume pricing. 
- **Make an Offer**: Negotiate prices directly from the product page.
- **Offer Management**: Manage active negotiations in the dedicated Hub.
- **B2B Ready**: Tailored for enterprise quotes and custom orders over ₹50k.

### 🤝 2. Collective Group Buy Pools
A dedicated system for unlocking massive bulk discounts through community purchasing power.
- **Tiered Discounts**: Reach funding milestones to unlock Tier 1, Tier 2, and Enterprise pricing.
- **Live Pool Chat**: Discuss the product with other buyers in real-time before committing.
- **Volume Savings**: Your card is only charged when the pool closes at the guaranteed lowest price.

### 🤖 3. AI Size Finder & AR Styling
Empowering buyers to make confident purchases without the guesswork.
- **AI Recommendation Engine**: Inputs like Height and Weight instantly calculate your tailored fit.
- **AR Try-On**: Visualize how apparel and products fit into your lifestyle.
- **Expectation Comparison Wall**: A community gallery comparing catalog studio images against real-world user photos.

### 💳 4. Secure Cart & Global Data
- **DummyJSON Integration**: Fully dynamic storefront powered by a live global API for endless product discovery.
- **Smart Cart Integration**: Global Redux state management dynamically calculates bulk discounts and shipping credits.
- **Secure Checkout**: Enterprise-tier checkout flow backed by 256-bit AES Encryption UI.

---

## 🛠️ Technical Architecture

### **Frontend**
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS with Advanced 3D Transforms (Glassmorphism & Keyframes)
- **State Management**: Redux Toolkit (`authSlice`, `cartSlice`)
- **Routing**: React Router DOM (Lazy Loading & Suspense)
- **External Data**: Axios & DummyJSON API

### **Backend**
- **Runtime**: Node.js & Express
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) with LocalStorage fallback
- **Environment**: Dotenv for secure config management

---

## 📂 Project Roadmap

- [x] **Phase 1: UI Foundation** — Premium 3D-styled components and responsive layout.
- [x] **Phase 2: Global API** — Hooking up DummyJSON across Dashboard, Search, and Community.
- [x] **Phase 3: State Management** — Redux cart implementation and active negotiations.
- [x] **Phase 4: Group Buys** — Complex tiered discounting and live chat logic.
- [x] **Phase 5: Authentication** — Secure Buyer & Admin Roles with JWT integration.
- [ ] **Phase 6: Deployment** — Vercel & Render Integration.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/shoptiq.git
   cd shoptiq
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with PORT, MONGO_URI, and JWT_SECRET
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file if necessary
   npm run dev
   ```

---

## 📱 Responsive Experience
Shoptiq is engineered for a seamless multi-device experience, ensuring the premium 3D aesthetic remains stunning across:
- **Mobile (375px)**
- **Tablet (768px)**
- **Desktop (1440px+)**

---

<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Styled%20with-CSS3-1572B6?style=for-the-badge&logo=css3" alt="CSS3" />
  <img src="https://img.shields.io/badge/Powered%20by-Node.js-339933?style=for-the-badge&logo=node.js" alt="Node.js" />
</div>

<div align="center">
  <strong>Shoptiq Ecosystem</strong> &nbsp;·&nbsp; Build for the modern digital marketplace &nbsp;·&nbsp; 2024
</div>