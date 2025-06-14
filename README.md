# 🗂 Overview to Music Search App

### Music search app with Spotify API integration. Users can authenticate via JWT, search across songs/artists/albums, and link directly to Spotify's web player. Built with decoupled frontend/backend architecture.

## Links

- [Github Link](https://github.com/Kasador/music-search-app)
- [Live URL](https://hunterstevenshaw-music-search-app.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b001261a-fe4c-4215-8bb5-085a4f375371/deploy-status)](https://app.netlify.com/projects/hunterstevenshaw-music-search-app/deploys)

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

## Project Mockups

<img src="https://github.com/user-attachments/assets/db9df9ba-afc1-4f84-8160-3b697823dc42" width="500" alt="Project's Mockups">

<img src="https://github.com/user-attachments/assets/e37cd665-b460-4355-ad6a-c98ce1f9785b" width="500" alt="Project's Mockups">

<img src="https://github.com/user-attachments/assets/49ea0e3e-7e7f-4fd7-b9d9-2ac371a3f856" width="500" alt="Project's Mockups">

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=react,sass,vite)](https://skillicons.dev)

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,postman,mongodb)](https://skillicons.dev)

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
- MongoDB/ATLAS

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
    - npm i axios (**_Fetch Requests/Reponses_**)
    - npm i --save-dev nodemon (**_Hot Reload on Change - Backend_**)
    - npm i --save-dev concurrently (**_Spin up both frontend/backend at the same time_**)
    - npm i dotenv (**_Configuration/use of env variables_**)
    - npm i cors (**_Allowing connection between frontend/backend in production_**)
    - npm i mongoose (**_Defining models for the database_**)

## Updates 

### Both frontend/backend inital setup complete. Ready to code! 

<img width="635" alt="Image" src="https://github.com/user-attachments/assets/0243737d-1d1b-47d5-a010-c07fef15070a" />

### Backend is connected to a MongoDB database.

<img width="559" alt="Image" src="https://github.com/user-attachments/assets/1c97fb4a-7113-4e4a-8893-ce7118b88fe0" />

### Backend hosted on Render. 

![Image](https://github.com/user-attachments/assets/2d46332c-ca8c-4dee-8f51-2d38e7165af4)

### Added Spotify credentials and created a developer account.

```js 
try {
        const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
        const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

        if (!spotifyClientId || !spotifyClientSecret) {
            return res.status(500).json({
                error: 'Api credentials are missing from the env variables.',
                method: req.method
            });
        }
```

### Updated frontend application with protected routes.

- if user is not logged in, redirect to login page
- if the user is auth'd, allow the user to navigate/view other routes. 

<img width="600" alt="Image" src="https://github.com/user-attachments/assets/95d4a165-f84c-4f9f-baa2-c3e3e86dd3eb" />

<img width="600" alt="Image" src="https://github.com/user-attachments/assets/e2c75aa7-4786-4a26-a278-3c95e4141e0c" />

### Saved tokens to database.

![image](https://github.com/user-attachments/assets/419b81d2-d3bc-44f0-8095-6dd4ae248821)
