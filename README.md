# 🌤️ Weather Dashboard

A full-stack weather application that fetches real-time weather data and a 5-day forecast for any city worldwide. Built to practice API integration, asynchronous JavaScript, and backend security best practices.

![Weather Dashboard Demo] 
<img width="1622" height="956" alt="Screenshot 2026-07-09 183808" src="https://github.com/user-attachments/assets/92115dee-5f28-473c-b19f-1908f25f078c" />

## 📋 Features

- **City Search** — Look up current weather for any city by name
- **Current Weather Details** — Temperature, humidity, wind speed, and condition description
- **5-Day Forecast** — Visual forecast cards showing upcoming daily temperatures
- **Weather Icons** — Dynamic icons matching real-time conditions
- **Save Favorite Cities** — Save cities using localStorage; persists across page reloads
- **Error Handling** — Graceful handling of invalid city names and API failures
- **Loading States** — Visual feedback while data is being fetched
- **Responsive Design** — Fully functional on mobile, tablet, and desktop

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3, Vanilla JavaScript
- Fetch API for asynchronous requests
- LocalStorage for persisting saved cities

**Backend**
- Node.js
- Express.js
- Axios (for external API calls)
- dotenv (environment variable management)
- CORS (cross-origin request handling)

**External API**
- [OpenWeatherMap API](https://home.openweathermap.org/api_keys)

## 🏗️ Architecture
Frontend (HTML/CSS/JS)
│
│  fetch()
▼
Backend (Node.js + Express)
│
│  axios
▼
OpenWeatherMap API

The backend acts as a proxy between the frontend and OpenWeatherMap. This keeps the API key secure on the server side instead of exposing it in client-side JavaScript, and avoids CORS restrictions.

## 📁 Project Structure
weather-dashboard/
├── backend/
│   ├── server.js          # Express server & API routes
│   ├── package.json
│   └── .env                # API key (not committed to Git)
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore
└── README.md
