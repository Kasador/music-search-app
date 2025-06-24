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
                refresh_token: userData.refresh_token || refresh_token, // refresh good to go and if Spotify don't give me back another one, use the same one
                user_id: userId
            });
            await tokenData.save();

            validAccessToken = newAccessToken
        }

        // req.user = decoded;
        req.user = { // send as request user and their data/info
            userId,
            accessToken: validAccessToken,
            refreshToken: refresh_token
        };

        console.log('Middleware Token Decoded:', decoded);
        // console.log('Middleware Access Token', decoded.access_token);
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