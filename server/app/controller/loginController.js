// auth controller 
const axios = require('axios');
const Auth = require('../models/Auth');
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow

const loginAuth = async (req, res) => {
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

        // // const getAuth = await Auth.find();

        // return res.status(200).json({
        //     success: true,
        //     // data: getAuth
        //     message: `From /api/v1/login`,
        // });
        var state = generateRandomString(16);
        var scope = 'user-read-private user-read-email';

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
            response_type: 'code',
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: spotifyRedirectUri,
            state: state
        }));
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    loginAuth
};