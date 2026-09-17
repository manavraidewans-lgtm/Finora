# Finora 🍀

A modern, responsive personal finance management web application built with **React, Vite, and Tailwind CSS**.

Finora is a frontend-focused fintech dashboard designed to help users track transactions, understand spending, manage budgets, monitor savings goals, and visualize financial activity through an interactive and polished interface.

> 🚧 **Project Status:** In Development

---

## 📸 Preview

Screenshots and the live demo will be added as the application develops.

<!-- Add screenshots here -->

---

## 💼 About The Project

**Finora** is a frontend-focused personal finance management application created as a showcase project to demonstrate practical React development and modern UI engineering.

The application separates the public marketing experience from the main finance dashboard and uses reusable React components, client-side routing, responsive layouts, interactive charts, and local data management.

The goal is to create an experience that feels closer to a real-world fintech SaaS product rather than a simple tutorial project.

### Key Highlights

* Built with React and Vite
* Responsive fintech dashboard experience
* Separate landing page and application dashboard
* Client-side routing with React Router
* Reusable and maintainable React components
* Interactive financial visualizations using Recharts
* Responsive styling with Tailwind CSS
* Local/mock financial data for frontend development
* Structured for future backend and authentication integration
* Designed with scalability and reusable UI patterns in mind

---

# ✨ Features

## 🌐 Landing Page

* Modern responsive landing page
* Hero section
* Product features section
* About section
* Call-to-action sections
* Responsive navigation
* Login and signup navigation
* Modern fintech-focused visual design

---

## 🔐 Authentication UI

* Login page
* Signup page
* Client-side authentication flow
* Dashboard navigation after login
* Frontend structure prepared for future authentication integration

> The current authentication experience is for frontend demonstration purposes and does not use a real authentication backend.

---

## 📊 Dashboard

The dashboard provides a quick overview of the user's financial activity.

* Total balance
* Monthly income
* Monthly expenses
* Savings overview
* Spending overview
* Income vs. expenses
* Recent transactions
* Budget progress
* Savings goals
* Upcoming recurring payments
* Financial insights
* Responsive dashboard layout

---

## 💳 Transactions

A dedicated transaction management experience for viewing and organizing financial activity.

* Transaction history
* Income and expense tracking
* Transaction categories
* Search functionality
* Category filtering
* Income/expense filtering
* Transaction details
* Add transaction interface
* Edit transaction interface
* Delete transaction interface
* Responsive transaction table/cards

Example categories include:

* Food
* Shopping
* Transport
* Entertainment
* Bills
* Rent
* Subscriptions
* Healthcare
* Travel
* Investments

---

## 💰 Budgets

Manage monthly spending limits and monitor progress across different categories.

* Monthly budget overview
* Category-based budgets
* Amount spent
* Remaining budget
* Progress indicators
* Budget alerts
* Add/edit budget interface

---

## 📈 Analytics

Finora uses interactive charts to make financial information easier to understand.

* Income vs. expenses
* Monthly spending trends
* Expense breakdown
* Category analysis
* Financial trends
* Interactive chart tooltips
* Monthly financial summaries

Charts are built using **Recharts**.

---

## 🎯 Goals & Savings

Track progress toward personal financial goals.

* Create savings goals
* Target amount
* Current saved amount
* Target date
* Goal progress
* Progress visualization
* Multiple savings goals

Example goals:

* Emergency Fund
* New Laptop
* Travel
* Education
* Car

---

## 🔄 Recurring Payments

Track subscriptions and recurring financial commitments.

* Subscriptions
* Bills
* Recurring payments
* Payment frequency
* Next payment date
* Monthly recurring total
* Upcoming payment overview

---

## 📅 Calendar

A financial calendar for keeping track of upcoming financial events.

* Upcoming bills
* Recurring payments
* Income dates
* Financial events
* Date-based financial overview

---

## 📄 Reports

A dedicated section for understanding financial activity over time.

* Monthly financial summaries
* Spending reports
* Income reports
* Savings progress
* Financial overview
* Report/export interface

---

## ✨ AI Insights

Finora includes a frontend-simulated financial insights experience.

The interface generates intelligent-looking observations based on the user's existing financial data.

Example insights:

> "Your dining expenses increased 18% this month."

> "You are on track to reach your emergency fund goal."

> "Subscriptions account for ₹2,450 of your monthly spending."

This feature is currently a **frontend simulation** and does not use a real AI backend.

---

## ⚙️ Settings

Application settings include:

* Profile settings
* Currency preferences
* Appearance preferences
* Notification settings
* Category management
* Data management
* LocalStorage reset/clear functionality

---

# 📱 Responsive Design

Finora is designed to work across:

* 🖥️ Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

The application includes:

* Responsive sidebar navigation
* Mobile navigation
* Responsive dashboard cards
* Mobile-friendly transaction views
* Responsive charts
* Adaptive layouts
* Touch-friendly controls

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **React**        | Component-based UI development |
| **JavaScript**   | Application logic              |
| **Vite**         | Development and build tooling  |
| **Tailwind CSS** | Responsive styling             |
| **React Router** | Client-side routing            |
| **Lucide React** | Interface icons                |
| **Recharts**     | Financial data visualization   |
| **clsx**         | Conditional CSS classes        |

## Development Tools

* Git
* GitHub
* VS Code
* Figma
* npm

---

# 🏗️ Project Architecture

Finora is organized around reusable React components and separate application pages.

```text
Finora/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── data/
│   │
│   ├── context/
│   │
│   ├── hooks/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

# 🧭 Application Flow

Finora separates the public website from the main application experience.

```text
                         FINORA
                           │
                           ▼
                     Landing Page
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
          Features                    About
                                        │
                                        ▼
                                      Login
                                        │
                                        ▼
                                   Dashboard
                                        │
       ┌────────────┬────────────┬──────┴──────┬────────────┐
       ▼            ▼            ▼             ▼            ▼
   Transactions   Budgets     Analytics       Goals      Recurring
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
                 Calendar                                 Reports
                                                            │
                                                            ▼
                                                      AI Insights
                                                            │
                                                            ▼
                                                        Settings
```

---

# 🗺️ Routes

| Route           | Page               |
| --------------- | ------------------ |
| `/`             | Landing Page       |
| `/login`        | Login              |
| `/signup`       | Signup             |
| `/dashboard`    | Dashboard          |
| `/transactions` | Transactions       |
| `/budgets`      | Budgets            |
| `/analytics`    | Analytics          |
| `/goals`        | Goals              |
| `/recurring`    | Recurring Payments |
| `/calendar`     | Calendar           |
| `/reports`      | Reports            |
| `/insights`     | AI Insights        |
| `/settings`     | Settings           |

The landing page uses a public navigation system, while the authenticated application uses a dedicated dashboard navigation.

---

# 💾 Data Management

The current version of Finora is primarily a frontend application.

Financial data is initially handled through local/mock data and can be persisted using **browser LocalStorage**.

This allows the application to demonstrate realistic frontend functionality without requiring a backend server.

Future versions can replace the local data layer with a REST API or other backend service without completely restructuring the frontend.

---

# 📊 Data Visualization

Finora uses **Recharts** to create interactive financial visualizations.

Planned and implemented visualizations include:

* Income vs. expenses
* Monthly spending trends
* Expense category breakdown
* Budget progress
* Savings progress
* Financial trends
* Category comparisons

All financial examples use **Indian Rupees (₹)** and realistic Indian spending categories.

Example values:

```text
Total Balance       ₹2,45,680
Monthly Income      ₹85,000
Monthly Expenses    ₹32,450
```

---

# 🎨 UI & Design

Finora follows a modern fintech/SaaS design language focused on:

* Clean typography
* Minimal interface
* Strong visual hierarchy
* Consistent spacing
* Responsive layouts
* Subtle borders
* Soft shadows
* Modern dashboard cards
* Clear data presentation
* Accessible controls
* Subtle animations and transitions

The design aims to feel like a real financial product while maintaining a simple and intuitive user experience.

---

# 🔒 Authentication

The current authentication experience is frontend-only and intended for development and portfolio demonstration.

A future production implementation could include:

* Secure user authentication
* Protected routes
* Session management
* Password security
* OAuth
* User accounts

---

# 🗄️ Future Backend

Finora is currently focused on frontend development.

A future backend implementation could include:

* User authentication
* Database storage
* Transaction APIs
* Budget APIs
* Financial goals
* Recurring payments
* Persistent user data
* Cloud synchronization
* API integration

---

# 🔮 Future Improvements

* [ ] Real user authentication
* [ ] Backend API
* [ ] Database integration
* [ ] Persistent user accounts
* [ ] Add transactions
* [ ] Edit transactions
* [ ] Delete transactions
* [ ] Advanced transaction filtering
* [ ] Expense categorization
* [ ] Budget management
* [ ] Financial goals
* [ ] Recurring payments
* [ ] Advanced analytics
* [ ] Real notification system
* [ ] Dark mode
* [ ] Accessibility improvements
* [ ] Production optimization
* [ ] Deployment

---

# 📦 Installation

## 1. Clone the repository

```bash
git clone https://github.com/manavraidewans-lgtm/Finora.git
```

## 2. Navigate to the project

```bash
cd Finora
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL in the terminal.

---

# 🚀 Available Scripts

### Start development server

```bash
npm run dev
```

### Create production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

---

# 🚀 Deployment

Finora can be deployed using modern frontend hosting platforms such as **Vercel**.

Production deployment will be added after the main application is completed.

---

# 📚 What This Project Demonstrates

Finora is being developed as a real-world frontend project to demonstrate practical experience with:

* React
* JavaScript
* Component-based architecture
* React Router
* Tailwind CSS
* Responsive web design
* Reusable components
* State management
* Form handling
* LocalStorage
* Data visualization
* UI/UX implementation
* Git and GitHub
* Frontend project organization

---

# 👨‍💻 Author

**Manav Dewan**

Frontend Developer | React Developer

---

# 📄 License

This project is created for **learning, development, and portfolio purposes**.

---

# ⚠️ Disclaimer

Finora is a fictional personal finance management application created as a development and portfolio project.

It does not provide financial advice and should not be used as a substitute for professional financial guidance.

---

## ⭐ Finora

If you find Finora interesting, feel free to explore the project and follow its development.
