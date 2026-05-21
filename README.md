# 🎓 NTI Capacity Building Program - Assessment System

A complete frontend assessment system built with **HTML, CSS, Bootstrap 5, and JavaScript** for the NTI (National Telecommunication Institute) Capacity Building Program.

## 📸 Screenshots Reference

The design is based on the provided UI mockups showing:
- **Dark Theme** with Navy Blue (#0f172a) background
- **Green Accent** (#22c55e) for success states
- **Red Accent** (#ef4444) for failure states
- Glassmorphism cards with backdrop blur
- Responsive grid layouts

## 🚀 Features

### Authentication
- ✅ Login Page with demo credentials (accepts any email/password)
- ✅ Registration Page with profile selection
- ✅ Session management via LocalStorage
- ✅ Logout functionality

### Dashboard
- ✅ Welcome screen with student name
- **Before Completion:** Shows assessment cards with descriptions
- **After Completion:** Shows results with progress bars and pass/fail status
- ✅ Dynamic state updates based on exam completion

### Exam System
- ✅ **IQ Session** - 15 questions (10 minutes)
  - Pattern recognition, logic, mathematics
- ✅ **English Session** - 15 questions (10 minutes)
  - Vocabulary, grammar, comprehension
- ✅ **Technical Session** - 20 questions (20 minutes)
  - HTML, CSS, JavaScript, Bootstrap, Front-End concepts

### Exam Features
- ✅ **Timer** with countdown and warning animation (last 60 seconds)
- ✅ **Question Navigation** - Sidebar grid with answered/unanswered indicators
- ✅ **Progress Tracking** - Visual steps showing exam progress
- ✅ **Option Selection** - Click-to-select with visual feedback
- ✅ **Session Tabs** - IQ and English session switching
- ✅ **Auto-submit** when time runs out
- ✅ **Modals** for completion confirmations

### Results
- ✅ Individual session scores
- ✅ Combined percentage calculation
- ✅ Pass/Fail status with color coding
- ✅ Progress bars with animations
- ✅ Retake option

## 📁 Project Structure

```
nti-assessment/
├── index.html              # Login Page
├── auth/
│   └── register.html       # Registration Page
├── dashboard/
│   └── index.html          # Student Dashboard
├── exams/
│   ├── instructions.html   # Exam Instructions
│   ├── iq.html            # IQ Exam Session
│   ├── english.html       # English Exam Session
│   └── technical.html     # Technical Exam Session
├── results/
│   └── index.html         # Results Page
├── assets/
│   ├── css/
│   │   └── style.css      # Main Stylesheet (21KB)
│   └── js/
│       └── main.js        # Main JavaScript (30KB)
```

## 🎨 Design System

### Colors
- **Primary Background:** #0f172a (Navy Blue)
- **Secondary Background:** #1e293b (Slate)
- **Card Background:** rgba(30, 41, 59, 0.8) with backdrop blur
- **Accent Green:** #22c55e (Success/Pass)
- **Accent Red:** #ef4444 (Error/Fail)
- **Accent Blue:** #3b82f6 (Info)
- **Text Primary:** #f1f5f9
- **Text Secondary:** #94a3b8

### Typography
- **Font Family:** Cairo + Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800

### Components
- Glassmorphism cards with border highlights
- Animated progress bars
- Circular question buttons with state indicators
- Modal overlays with backdrop blur
- Responsive navigation bar

## ⚡ How to Use

1. **Open `index.html`** in your browser
2. **Login** with any email and password (demo mode)
3. **Dashboard** - Click "Take the Assessment"
4. **Instructions** - Read and click "Start IQ Session"
5. **IQ Exam** - Answer 15 questions within 10 minutes
6. **English Exam** - Automatically proceeds after IQ completion
7. **Technical Exam** - Unlocks after IQ & English completion
8. **Results** - View your scores and pass/fail status

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **Bootstrap 5.3** - Grid system and utilities
- **JavaScript (ES6+)** - State management, Timer, DOM manipulation
- **LocalStorage API** - Data persistence
- **Google Fonts** - Cairo + Inter

## 📱 Responsive Design

- **Desktop:** 3-column exam layout (sidebar + main + questions)
- **Tablet:** Single column with horizontal question grids
- **Mobile:** Stacked layout with optimized touch targets

## 🔄 Exam Flow

```
Login → Dashboard → Instructions → IQ Exam → English Exam → Technical Exam → Results
```

## 🧪 Demo Data

The system includes 50 pre-built questions:
- 15 IQ questions (pattern recognition, logic, math)
- 15 English questions (vocabulary, grammar)
- 20 Technical questions (HTML, CSS, JS, Bootstrap)

## 📝 Notes

- This is a **frontend-only** implementation
- Data persists in browser LocalStorage
- Timer runs in real-time using JavaScript intervals
- Exam state resets on logout
- All transitions are animated for smooth UX

## 🎯 Future Enhancements

- Backend integration with PHP/MySQL
- Admin dashboard for question management
- Real-time proctoring features
- PDF certificate generation
- Multiple job profile tracks

---

**Built for NTI Capacity Building Program** 🏛️
