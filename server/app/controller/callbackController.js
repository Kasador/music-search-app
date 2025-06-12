// auth controller 
const axios = require('axios');
const Auth = require('../models/Auth');
// const querystring = require('querystring');

// https://developer.spotify.com/documentation/web-api/tutorials/code-flow

const getCallback = async (req, res) => {
    try {
        const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
        const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;

        console.log('callback client ID:', spotifyClientId);
        console.log('callback URI:', spotifyRedirectUri);

        let code = req.query.code || null;

        // const homePageURL = "http://localhost:5173/"
        //   const authOptions = querystring.stringify({
        //     response_type: 'code',
        //     client_id: spotifyClientId,
        //     scope: scope,
        //     redirect_uri: spotifyRedirectUri,
        //     // state: state,
        // });
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
            // 'Access-Control-Allow-Origin': '*'
                    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
        },
            json: true
        };

        // make a post request
        const response = await axios(authOptions);

        // console.log('code', code)
        console.log(response.data)
        // console.log(res);
        //  res.status(200).json({
        //     success: true,
        //     authenticated: true,
        //     access_token: access_token,
        //     refresh_token: refresh_token,
        //     expires_in: expires_in,
        //     message: 'Authentication successful!'
        // });
        res.redirect('http://localhost:5173/');
        
        // res.status(200).json({
        //     success: true,
        //     data: response,
        //     message: 'callback request worked!'
        // })
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