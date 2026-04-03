# 💼 Finance Dashboard

A modern, fully-featured finance dashboard built with **React** and **Vite**. This application provides an intuitive interface for tracking financial activities, visualizing spending patterns, and managing transactions with role-based access control.

**Live Demo**: Available at `http://localhost:5173/` (when running `npm run dev`)

---

## ✨ Key Features

### 📊 Dashboard Overview
- **Summary Cards**: Real-time display of Total Balance, Total Income, and Total Expenses
- **Balance Trend Chart**: Line chart showing monthly balance changes over time
- **Spending Breakdown**: Pie chart visualizing expenses by category with percentages
- **Responsive Layout**: Adapts seamlessly to all screen sizes

### 💰 Transactions Management
- **Complete Transaction List**: View all transactions with date, amount, category, and type
- **Smart Filtering**: Filter by category, transaction type (income/expense), or search by keyword
- **Color-Coded Amounts**: Income in green, expenses in red for quick visual scanning
- **Transaction Badges**: Easy identification of income vs. expense at a glance
- **Empty State Handling**: Friendly UI when no transactions match your filters
- **Add & Edit Functionality** (Admin Only):
  - Modal form for adding new transactions
  - Edit existing transactions with a user-friendly form
  - Delete transactions with confirmation
  - Form validation and error handling

### 👥 Role-Based Access Control
| Feature | Viewer | Admin |
|---------|--------|-------|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| Filter & Search | ✅ | ✅ |
| Add Transactions | ❌ | ✅ |
| Edit Transactions | ❌ | ✅ |
| Delete Transactions | ❌ | ✅ |

- **Easy Role Switching**: Dropdown selector in header to toggle between Viewer and Admin roles for demonstration

### 🌙 Dark Mode
- **Theme Toggle**: Switch between light and dark themes with a single click
- **Smart Styling**: Both themes are carefully designed for optimal readability and visual appeal
- **Persistent Experience**: Smooth transitions between themes without losing any data

### 📈 Financial Insights
- **Highest Spending Category**: Automatically identifies which category you spend the most on
- **Monthly Comparison**: Shows trend direction (increased/decreased/same) compared to previous month
- **No Data Handling**: Graceful display when insights aren't available yet

### 🎨 UI/UX Enhancements
- **Gradient Header**: Eye-catching purple-blue gradient for the main title
- **Interactive Cards**: Hover effects on summary cards with smooth animations
- **Modal Dialogs**: Clean, centered forms for adding/editing transactions
- **Smooth Animations**: Floating empty states, slide-up modals, fade-in overlays
- **Professional Styling**: Consistent color scheme, typography, and spacing throughout

---

## 🛠️ Technologies Used

| Tech | Purpose |
|------|---------|
| **React 18** | UI library with hooks (useState, useMemo) |
| **Vite** | Fast build tool and dev server |
| **Recharts** | Interactive data visualization (charts) |
| **CSS3** | Advanced styling, animations, gradients |
| **JavaScript ES6+** | Modern language features |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

```bash
# 1. Navigate to project directory
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The dashboard will open at `http://localhost:5173/`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
finance-dashboard/
├── src/
│   ├── App.jsx          # Main component with all logic
│   ├── App.css          # Comprehensive styling
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── public/              # Public assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

---

## 💡 How to Use

### For Viewers:
1. Select **"Viewer"** from the Role dropdown
2. Browse the dashboard to see financial summaries
3. Use filters to explore transactions by category or type
4. View spending patterns in the charts

### For Admins:
1. Select **"Admin"** from the Role dropdown
2. Click **"+ Add Transaction"** button to create new entries
3. Click **"Edit"** on any transaction to modify it
4. Click **"Delete"** to remove a transaction
5. View changes reflected immediately in charts and summaries

### Toggle Dark Mode:
- Click the **"Dark Mode"** / **"Light Mode"** button in the header anytime

---

## 🎯 Technical Approach & Design Decisions

### State Management
- **React Hooks**: Used `useState` for component state (transactions, filters, role, modal state) and `useMemo` for optimized calculations
- **Why?** Simple, effective, and scalable for this project size
- **Alternative**: Could use Redux/Zustand for larger applications

### Data Structure
- **Mock Data**: Transactions stored in a simple array with id, date, amount, category, and type
- **Calculated Data**: Balance trends and spending breakdowns are computed on-the-fly using `useMemo` to prevent unnecessary recalculations

### Component Architecture
- **Single Component**: All logic in App.jsx for simplicity
- **Scalability**: Could be split into smaller components (TransactionTable, Charts, Modal, etc.) for larger applications

### Styling Approach
- **CSS Variables & Gradients**: Used modern CSS features for beautiful, maintainable styles
- **Mobile-First**: Media queries ensure responsive design on all devices
- **Dark Mode**: Achieved through CSS class switching (.light / .dark) applied to root element

### Form Handling
- **Modal-Based**: Transaction add/edit uses a modal for focused user experience
- **Validation**: HTML5 form validation for required fields and data types
- **State Isolation**: Form data is separate from transaction data until submission

### Empty States
- **User-Friendly**: Shows helpful messages with icons when:
  - No transactions match current filters
  - No spending data available for insights
- **Prevents Confusion**: Users know why they see empty sections

---

## 🎨 Design Highlights

### Color Scheme
- **Primary Gradient**: `#667eea` → `#764ba2` (Purple-Blue)
- **Income**: `#00a86b` (Green)
- **Expense**: `#ff4757` (Red)
- **Light Background**: Subtle gradient for depth
- **Dark Background**: Deep, eye-friendly shades

### Interactive Elements
- **Hover Effects**: Smooth transforms and shadow changes
- **Animations**: Float animation on empty states, slide-up modals
- **Feedback**: Color changes on form focus, button interactions

---

## ✅ Requirements Met

| Requirement | Status | Implementation |
|------------|--------|-----------------|
| Dashboard Overview | ✅ | Summary cards + 2 charts |
| Transactions Section | ✅ | Table with filtering & search |
| Role-Based UI | ✅ | Viewer/Admin with conditional rendering |
| Insights Section | ✅ | Highest spending + Monthly comparison |
| State Management | ✅ | React hooks with proper data flow |
| Clean Design | ✅ | Modern UI with gradients & animations |
| Responsiveness | ✅ | Mobile, tablet, desktop layouts |
| Empty States | ✅ | Friendly UI for no data scenarios |
| Dark Mode | ✅ | Full theme support throughout |
| Add/Edit Transactions | ✅ | Modal forms with full CRUD operations |

---

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Two-column charts, full-width tables, side-by-side controls
- **Tablet**: Stacked layout with adjusted spacing
- **Mobile**: Single-column layout, touch-friendly buttons, full-width inputs

---

## 🔮 Future Enhancement Ideas

- **Local Storage**: Persist transactions across sessions
- **Data Export**: Download transactions as CSV/JSON
- **Advanced Filtering**: Date range, amount range, multiple categories
- **Budget Tracking**: Set and monitor spending budgets
- **API Integration**: Connect to real banking or finance APIs
- **Charts Enhancement**: More chart types (bar, area, scatter)
- **User Profiles**: Multiple user support with separate data
- **Notifications**: Alerts for large expenses or budget thresholds
- **Mobile App**: React Native version for iOS/Android

---

## 👨‍💼 Assignment Evaluation

This submission demonstrates:

✅ **Frontend Skills**
- React fundamentals and hooks
- CSS mastery (animations, gradients, responsive design)
- JavaScript ES6+ features

✅ **Design Thinking**
- Intuitive navigation and clear visual hierarchy
- Accessibility considerations (color contrast, readable text)
- Attention to micro-interactions (hover effects, animations)

✅ **Problem Solving**
- Efficient state management with memoization
- Graceful error/empty state handling
- RBAC simulation without backend

✅ **Code Quality**
- Clean, readable component structure
- Modular CSS organization
- No external UI libraries (custom styling)
- Performance optimized with React hooks

✅ **User Experience**
- Smooth interactions and transitions
- Clear feedback for user actions
- Mobile-friendly design
- Both light and dark themes

---

## 📝 License

This project is submitted as part of the Frontend Developer Intern assignment.

---

## 🙙 Thank You

Built with ❤️ and attention to detail. Hope you enjoy! 🚀
