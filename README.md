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
 ![image](https://github.com/user-attachments/assets/9e79b345-a6a9-4782-8e72-f56d7bc0d200)

- Login Page:
 ![image](https://github.com/user-attachments/assets/c3c4e302-c9b4-4f89-9d1b-ba654c64ee2f)

- Chatroom:
 ![image](https://github.com/user-attachments/assets/6e55658d-49fa-4033-8144-1ab7a58bdd01)


## 📝 License

This project is licensed under the MIT License.



