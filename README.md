# 💬 ChatsWrap

**ChatsWrap** is a lightweight and stylish chat application built with **React** that enables user sign-up/login, color-coded messages, threaded replies, and a simple admin panel for user and chat management — all using browser `localStorage`.

## 🚀 Features

- 🔐 **User Authentication**: Sign-up and login functionality with basic credential storage.
- 🎨 **Message Customization**: Users can choose a preferred color for their messages.
- 💬 **Threaded Replies**: Reply to specific messages with context.
- 👥 **Admin Panel**:
  - View all registered users
  - Delete users
  - Clear all chat messages
- 🧠 **Single Page Application** using React Router.
- 💾 **Persistence** with localStorage — no backend required.

## 🛠️ Tech Stack

- **Frontend**: React, React Router
- **Styling**: CSS (Dark-themed, responsive)
- **State & Storage**: React Hooks, localStorage API

## 📦 Project Structure

```
📁 src/
├── App.js          # Main application logic and routes
├── index.js        # Entry point
├── index.css       # Styling
```

## 🖥️ Usage

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/chatswrap.git
   cd chatswrap
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```

4. **Open your browser at** `http://localhost:3000`

## 🔐 Admin Access

To access the admin panel:

- Navigate to `/admin`
- Default password: `123`

> You can customize this in `App.js` under `AdminLogin`.

## 📸 Screenshots

- Signup Page:
 ![Screenshot 2025-04-04 201209](https://github.com/user-attachments/assets/f3eab8f4-6be0-4228-bd01-94b794ce13d5)

- Login Page:
 ![Screenshot 2025-04-04 201224](https://github.com/user-attachments/assets/4f59856e-5a55-4040-841b-4b953e7c9927)

- Chatroom:
 ![Screenshot 2025-04-04 201714](https://github.com/user-attachments/assets/2c8b9f8e-5378-445f-a25e-ecf5d8fb83d0)







