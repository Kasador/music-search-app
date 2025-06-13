// auth controller 
const axios = require('axios');
const Auth = require('../models/Auth');
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow

const getCallback = async (req, res) => {
    try {
        const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
        const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;

        console.log('callback client ID:', spotifyClientId);
        console.log('callback URI:', spotifyRedirectUri);

        let code = req.query.code || null;

        let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        data: {
            code: code,
            redirect_uri: spotifyRedirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64'),
        },
            json: true
        };

        // make a post request
        const response = await axios(authOptions);

        // console.log('code', code)
        console.log(response.data)

        res.redirect('http://localhost:5173/');
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getCallback
};