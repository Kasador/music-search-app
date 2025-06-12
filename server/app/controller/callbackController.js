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

        let code = req.query.code || null;
        let state = req.query.state || null;

        if (state === null) {
            res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
        } else {
            // const homePageURL = "http://localhost:5173/"

            let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: spotifyRedirectUri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64')),
                // 'Access-Control-Allow-Origin': '*'
                        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader("Access-Control-Allow-Credentials", "true");
            },
                json: true
            };

            // make a post request
            const response = await axios.post(authOptions.url, authOptions.form, {
                headers: authOptions.headers
            });

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
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getCallback
};