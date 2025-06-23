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

### Sent token to localStorage, unlocked routes, redirected and finally saved token to localStorage for use.

```js
import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

/* DEV NOTES/DOCS >>>
    1) https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    2) https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    3) https://reactrouter.com/start/declarative/navigating
    4) https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set

    -----> This is a the best way I found to actually unlock my protected routes, otherwise...
    I could save the token but the route would still be locked, bad redirect, or unlocked without storing.
*/

const ProtectedRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // check if there is token in localStorage
        const params = new URLSearchParams(window.location.search);
        const URLtoken = params.get('token');

        if (URLtoken) { // if there is a token in the URL string when logged, we get that token and then save it to localStorage
            localStorage.setItem('token', URLtoken);
            console.log('Token has been stored!');
            setIsAuth(true);

            navigate('/'); // redirect to main page
        } else { // if not in URL, then we will assume there is ALREADY one in localStorage.
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuth(true);
            } else {
                console.error('No token stored.');
                setIsAuth(false);
            }
        }

        setLoading(false); // after it runs the checks, then change to false, which would cancel out the null and return my protected routes.
    },[navigate]); // if state change in the useNavigate hook, which are redirects, then run the effect again.

    if (loading) return null; // prevents react from rendering a route that is in progress

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes;
```

### Huge frontend update; added layout, searchbar, footer, logout btn, etc. 

<img width="700" alt="Image" src="https://github.com/user-attachments/assets/1c0733bc-bd57-42d2-a970-f31801ed3bcc" />

### Returns data to the frontend. 

<img width="1519" alt="Image" src="https://github.com/user-attachments/assets/95f34392-d315-4e39-bed5-fb5f6749b55d" />

```js
// auth spotify controller
const axios = require('axios');

const OAuth = async (req, res) => {
    const { token, input} = req.headers;
    const { access_token } = req.user;

    console.log("Input Value:", input);
    console.log("Token Value:", token);
    console.log("Access Value:", access_token);

    const data = await axios.get("https://api.spotify.com/v1/search", { // https://developer.spotify.com/documentation/web-api/reference/search
        headers: { // headers to auth with access token... 
            Authorization: `Bearer ${access_token}`
        },
        params: { // params to query
            q: input,
            type: 'track',
            limit: 10
        }
    });

    console.log(data.data.tracks);

    return res.status(200).json({
        success: true,
        message: `Valid tokens and input.`,
        data: data.data.tracks
    })
};

module.exports = {
    OAuth
}
```

### OAuth is now validating access tokens and is now checking database for existing data. Also, JWT token now stores ONLY the user id instead of the API's tokens. 

- Middleware file 

```js
// auth middleware
const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');
const axios = require('axios');

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) return res.status(401).json({ // error handling for localStorage token
            error: 'Missing token from localStorage.'
        });

        console.log('Middleware Token Value:', token);

        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = jwt.decode(token);
        const userId = decoded.user_id; // the spotify's user ID 

        const tokenData = await Auth.findOne({ // find the user id and the correct document from DB
            user_id: userId
        });

        if (!tokenData) return res.status(401).json({ // error handling for database token
            error: 'Missing token for Spotify user.'
        });

        const { access_token, refresh_token, expires_in, updatedAt } = tokenData; // decontruct all the data from the doc in the DB

        const expiresAt = new Date(updatedAt).getTime() + expires_in * 1000; // time that token was last saved || Jan 1, 1970 (Unix epoch) || .getTime() is in ms * 1000 for seconds
        const now = Date.now(); // get current date/time

        let validAccessToken = access_token;

        if (now >= expiresAt) { // error handling and if stat for expired access token
            // access token expired and then we need to refresh it
            console.log('Access token expires, attempting to refresh the token...');

            const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
            const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
            // const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;

            let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            data: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token
            }).toString(),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64'),
            }};

            const resForRefresh = await axios(authOptions);
            const userData = resForRefresh.data

            const newAccessToken = userData.access_token;
            // const newExpiresIn = userData.expires_in;
            
            tokenData.set({
                access_token: userData.access_token,
                expires_in: userData.expires_in,
                refresh_token: userData.refresh_token,
                user_id: userId
            });
            await tokenData.save();

            validAccessToken = newAccessToken
        }

        // req.user = decoded;
        req.user = { // 
            userId,
            accessToken: validAccessToken,
            refreshToken: refresh_token
        };

        console.log('Middleware Token Decoded:', decoded);
        console.log('Middleware Access Token', decoded.access_token);
        // const accessToken = access.access_token

        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        return res.status(401).json({
            error: 'Invalid or expired JWT.'
        });
    }
}

module.exports = isAuth;
```

- Callback Route Updates 

```js
const existingAuth = await Auth.findOne({ user_id: userData.id }); // look for the user id if already exists in db

    if (!existingAuth) { // if not, make a new doc and save to db
        const newAuth = new Auth({
            access_token: data.access_token,
            expires_in: data.expires_in,
            refresh_token: data.refresh_token,
            user_id: userData.id
        });

        console.log("Data to be saved: ", newAuth);
        await newAuth.save();
    } else { // else, find and update the doc on login
        await Auth.findOneAndUpdate({ user_id: userData.id },
            {
                access_token: data.access_token,
                expires_in: data.expires_in,
                refresh_token: data.refresh_token,
                // updatedAt: new Date()
            },
            { new: true } // get back the document after the update has been applied
        );

        console.log('Data already existed and updated!')
    }
    // // deconstruct tokens // https://www.youtube.com/watch?v=AcYF18oGn6Y
    // const { access_token, refresh_token } = data;

    const token = jwt.sign( // https://www.npmjs.com/package/jsonwebtoken
        { user_id: userData.id },
        jwtSecret,
        { expiresIn: '1h'} // not 1hr, but 1h.
    );
```