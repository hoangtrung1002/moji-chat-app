<div align="center">
  <br />
      <img src="client/public/cover.png" alt="Project Banner">

  <h3 align="center">MOJI Chat app</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Moji Chat App is a real-time messaging application inspired by modern chat platforms. It supports direct messages, group conversations, real-time updates via Socket.IO, and a smooth, responsive UI.

The project is built with a full-stack TypeScript architecture, focusing on scalability, clean code, and best practices. It includes authentication, media uploads, infinite scrolling for messages, and real-time read/seen status.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Frontend: React, TypeScript, Tailwind CSS, Zustand
- Backend: Node.js, Express, TypeScript
- Database: MongoDB + Mongoose
- Realtime: Socket.IO
- Media Upload: Multer + Cloudinary
- Auth: JWT

## <a name="features">🔋 Features</a>

🔐 **JWT-based authentication**: JWT-based authentication using access and refresh tokens, with protected routes on both client and server. Tokens are refreshed automatically to keep users signed in securely.

⚡ **Real-time messaging**: Supports direct and group conversations with real-time message delivery powered by Socket.IO. Users are connected to conversation-specific rooms for efficient event broadcasting.

👀 **Message seen/delivered status**: Tracks seen status and unread message counts per user and per conversation. Unread counters are reset automatically when a conversation is opened.

🖼️ **Avatar upload with Cloudinary**: Users can update their profile avatars via image uploads handled by Multer and Cloudinary. Images are resized and optimized before being stored.

♾️ **Infinite scroll for chat history**: Implements cursor-based pagination to load older messages as the user scrolls upward. This keeps conversations fast and performant, even with large message histories.

🎨 **Modern UI with React + Tailwind CSS**: Built with React, Tailwind CSS, and TypeScript on the frontend, and Express + MongoDB on the backend. The codebase follows a modular, maintainable structure with strong type safety.

🧠 **State management using Zustand**: Global state is managed with Zustand and persisted in localStorage. The app restores authentication state correctly after page refreshes.

and many more, including code architecture and reusability.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/hoangtrung1002/moji-chat-app.git
cd moji-chat-app
```

**Installation**

Install the project dependencies using npm:

- On server folder

```bash
cd server
npm install
```

- On server client

```bash
cd client
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
<!-- server folder -->
NODE_ENV=development
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
FRONTEND_ORIGIN=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


<!-- client folder -->
VITE_API_URL=
VITE_SOCKET_URL=
```

Replace the placeholder values with your actually credentials. You can obtain these credentials by signing up on the

- Mongo Atlas for MongoDB connection - [Official Doc](https://www.mongodb.com/docs/manual/reference/connection-string/?deployment-type=atlas&interface-atlas-only=atlas-cli)
- Cloudinary - [Official Doc](https://cloudinary.com/documentation/finding_your_credentials_tutorial)

**Running the Project (server)**

```bash
cd server
npm run dev
```

**Running the Project (client)**

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.
