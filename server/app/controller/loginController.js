// login controller 
const axios = require('axios');
const Auth = require('../models/Auth');
const querystring = require('querystring');
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow
// https://community.spotify.com/t5/Spotify-for-Developers/Refresh-Token-API-returning-CORS-errors/td-p/5217897

const generateRandomString = (length) => { // https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

const loginAuth = async (req, res) => {
    console.log("login route")
    try {
        const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
        const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;

        if (!spotifyClientId || !spotifyClientSecret) { // error handling for no API env var.
            return res.status(500).json({
                error: 'Api credentials are missing from the env variables.',
                method: req.method
            });
        }

        console.log('before redirect');
        console.log('Client ID:', spotifyClientId);
        console.log('Redirect URI:', spotifyRedirectUri);

        const state = generateRandomString(16);
        console.log("State:", state)
        const scope = 'user-read-private user-read-email';
        console.log('Scope:', scope);

        const authSpotifyURI = querystring.stringify({
            response_type: 'code',
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: spotifyRedirectUri,
            // state: state,
        });
        
        res.redirect(`https://accounts.spotify.com/authorize?${authSpotifyURI}`);
    } catch (error) {
        // console.error('Internal Server Error')
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message
        });
    }
}

module.exports = {
    loginAuth
};