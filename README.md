# 🗂 Overview to Music Search App

### Music search app with Spotify API integration. Users can authenticate via JWT, search across songs/artists/albums, and link directly to Spotify's web player. Built with decoupled frontend/backend architecture.

## Links

- [Github Link](https://github.com/Kasador/music-search-app)

## Features

- Search songs, artists, and albums using Spotify Web API
- JWT-based authentication with persistent login
- Direct links to Spotify web player
- Responsive design
- Secure credential management
- Decoupled frontend/backend architecture

## Project Structure

```
music-search-app/
├── client/          # Frontend application (ReactJS)
├── server/          # Backend API (NodeJS/Express)
└── README.md
```

## Project Color Scheme

- #1db954 (**_Green_**)
- #ffffff (**_White_**)
- #191414 (**_Black_**)
- #a3a1a1 (**_Gray_**)
- #d9d9d9 (**_Light Gray_**)

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=react,sass,vite)](https://skillicons.dev)

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,postman)](https://skillicons.dev)

Frontend:

- ReactJS + Vite
- Styled Components (SCSS)

Backend:

- NodeJS
- Express
- JWT for authentication
- Spotify Web API
- Postman for testing endpoints
- localStorage

Deployment:

- [Netlify - Frontend](https://www.netlify.com/)
- [Render - Backend](https://render.com/)
## Getting Started

- [Spotify Developer Account](https://developer.spotify.com/)
- NodeJS (**_using v22+_**)
- npm (**_using v10.9.2_**)

```bash
git clone https://github.com/yourusername/music-search-app.git
cd music-search-app
```

### Prerequisites

- NodeJS (**_using v22+_**)
- npm (**_using v10.9.2_**)
    - npm create vite@latest (**_Frontend_**)
    - npm i express (**_Backend_**)
    - npm i jsonwebtoken (**_User AUTH_**)
    - npm i axios (**_Fetch Requests/Reponses__**)
    - npm i --save-dev nodemon (**_Hot Reload on Change - Backend_**)
    - npm i --save-dev concurrently (**_Spin up both frontend/backend at the same time_**)
    - npm i dotenv (**_Configuration/use of env variables_**)
    - npm i cors (**_Allowing connection between frontend/backend in production_**)
