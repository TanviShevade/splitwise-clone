# 💰 Splitwise Clone

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![License](https://img.shields.io/badge/License-Educational-orange)

A full-stack **Expense Sharing System** inspired by Splitwise, developed as an **MCA Semester I Mini Project**. The application enables users to create groups, add shared expenses, track balances, and settle payments through a simple and user-friendly interface.

---

# 📖 Project Overview

Splitwise Clone is a web application that simplifies the management of shared expenses among friends, roommates, colleagues, or family members. Users can create groups, add members, record expenses, and automatically calculate each member's share.

---

# ✨ Features

## 👤 User Features

- User Registration & Login
- Secure Authentication
- Create Expense Groups
- Add Members to Groups
- Add Shared Expenses
- Automatic Expense Splitting
- View Group Balances
- Settle Outstanding Balances
- View Expense History
- Responsive Dashboard

---

## 👨‍💼 Admin Features

- Admin Login
- Manage Users
- Manage Groups
- Monitor Expenses
- View Group Information

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Bootstrap 5
- HTML5
- CSS3
- JavaScript
- React Router

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Tools

- Visual Studio Code
- Git & GitHub
- Postman

---

# 📂 Project Structure

```
splitwise-clone/
│
├── backend/
│   ├── routes/
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── database/
│   └── splitwise.sql
│
├── screenshots/
│   ├── SignUp.jpg
│   ├── Login.jpg
│   ├── Dashboard.jpg
│   ├── AddGroup.jpg
│   ├── GropCreatedPage.jpg
│   ├── AddExpense.jpg
│   ├── AddAnExpense.jpg
│   ├── GroupBalances.jpg
│   ├── SettleUp.jpg
│   ├── AdminLogin.jpg
│   ├── ManageUsers.jpg
│   └── ManageGroups.jpg
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/TanviShevade/splitwise-clone.git
cd splitwise-clone
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## 3. Database Setup

Create a MySQL database named:

```sql
splitwise
```

Import the SQL file:

```
database/splitwise.sql
```

Open:

```
backend/db.js
```

Update the database configuration if required:

```javascript
host: "localhost",
user: "root",
password: "",
database: "splitwise",
```

---

## 4. Run the Backend

```bash
cd backend
node server.js
```

Backend URL:

```
http://localhost:5000
```

---

## 5. Run the Frontend

```bash
cd frontend
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 📸 Project Screenshots

### 📝 Sign Up
![Sign Up](src/Screenshots/SignUp.jpg)

---

### 🔑 Login
![Login](src/Screenshots/Login.jpg)

---

### 📊 Dashboard
![Dashboard](src/Screenshots/Dashboard.jpg)

---

### 👥 Add Group
![Add Group](src/Screenshots/AddGroup.jpg)

---

### ✅ Group Created
![Group Created](src/Screenshots/GropCreatedPage.jpg)

---

### 👨‍👩‍👧‍👦 Manage Groups
![Manage Groups](src/Screenshots/ManageGroups.jpg)

---

### 💰 Add Expense
![Add Expense](src/Screenshots/AddExpense.jpg)

---

### ➕ Add an Expense
![Add an Expense](src/Screenshots/AddAnExpense.jpg)

---

### ⚖️ Group Balances
![Group Balances](src/Screenshots/GroupBalances.jpg)

---

### 🤝 Settle Up
![Settle Up](src/Screenshots/SettleUp.jpg)

---

## 👨‍💼 Admin Panel

### 🔐 Admin Login
![Admin Login](src/Screenshots/AdminLogin.jpg)

---

### 👥 Manage Users
![Manage Users](src/Screenshots/ManageUsers.jpg)

---

# 🌟 Key Functionalities

- Secure User Authentication
- Group Management
- Expense Tracking
- Automatic Expense Splitting
- Balance Calculation
- Settle Up Feature
- Admin Dashboard
- User Management
- Group Management
- Responsive User Interface

---

# 🔮 Future Enhancements

- Online Payment Gateway Integration
- Email Notifications
- Expense Analytics & Charts
- Multi-Currency Support
- Mobile Application
- Dark Mode
- Recurring Expenses
- Two-Factor Authentication (2FA)

---



# 👩‍💻 Developer

**Tanvi Shevade**

🎓 MCA Student

💻 Aspiring Full Stack Web Developer

### Connect with Me

- **GitHub:** https://github.com/TanviShevade
- **LinkedIn:** https://www.linkedin.com/in/tanvi-shevade-aabbb6280

---

# 📄 License

This project was developed as an **MCA Semester I Mini Project** for educational and learning purposes.
