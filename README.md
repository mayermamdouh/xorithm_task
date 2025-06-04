# XOrithm Servers Status

A clean and responsive server status dashboard built with **Next.js**.  
Users can log in using **Google** or **GitHub** to view real-time server statuses, filter by status, sort by uptime, and explore detailed server history.

**Live Demo**: [xorithm-task.vercel.app](https://xorithm-task-8ast.vercel.app)

---

## Tech Stack

- **Next.js (App Router)**
- **Tailwind CSS**
- **NextAuth.js** – Google & GitHub authentication
- **React Icons**
- **Static server data**

---

## Authentication

Users must sign in using **Google** or **GitHub** before accessing the dashboard.

- Protected `/dashboard` route via `middleware.js`
- Auth session stored with JWT
- Logged-in users are greeted by name on the dashboard

---

## Features

- Secure authentication with Google & GitHub
- Search servers by name
- Server count display
- Filter servers by status (Up, Degraded, Down)
- Sort servers by uptime (Low to High / High to Low)
- Show last updated time
- View popup with full server details (IP, response time, uptime history)
- Visual uptime history with hover tooltips
- Custom 404 "Page Not Found" handling
- Fully responsive layout

---

## Static Data Example

Server data is manually written inside `data/server.js`, structured like this:

```js
{
  id: 1,
  name: "API Server",
  status: "degraded",
  ip: "192.168.0.1",
  responseTime: "180ms",
  uptime: "98.45",
  uptimeHistory: [
    { day: "Monday", date: "2024-06-01", status: "up", uptime: 99.8 },
    ...
  ]
}
```

---

## 🛠️ Getting Started Locally

1. Clone the repo:

```bash
git clone https://github.com/your-username/xorithm-task.git
cd xorithm-task
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file and add:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the dev server:

```bash
npm run dev
```

---

## 🌍 Deployment

Project is deployed on **Vercel**:  
[https://xorithm-task-8ast.vercel.app](https://xorithm-task-8ast.vercel.app)

Make sure to set your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 📸 Screenshots

(You can add UI screenshots here)

---

---

## Design Overview

The main goal was to keep the app clean, fast, and simple to use, while covering the core requirements like authentication, filtering, and viewing server details.

### Authentication

- Used **NextAuth.js** for integrating both Google and GitHub login.
- Implemented route protection using `middleware.js`, which ensures only logged-in users can access `/dashboard`.
- Used JWT for session handling to keep things stateless and secure.

### Dashboard

- Built as a **client-side component** using React state to manage filtering, sorting, and server detail popups.
- Each server has manually written static data stored in `/data/server.js`.
- Sorting and filtering are handled using native JS methods (`Array.filter`, `Array.sort`).

### UI/UX

- Used **Tailwind CSS** for fast and responsive styling.
- Added visual indicators for server status using `react-icons`.
- Detailed server data shown in a `Popup` modal, including a tooltip on each uptime bar for clarity.
