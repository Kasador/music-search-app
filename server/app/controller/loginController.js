// login controller 
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
        console.log('before redirect');
        console.log('Client ID:', spotifyClientId);
        console.log('Redirect URI:', spotifyRedirectUri);
        
        console.log('state', scope);
        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email';
        console.log('state', scope);

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
            response_type: '200',
            client_id: spotifyClientId,
            scope: scope,
            redirect_uri: spotifyRedirectUri,
            state: state
        }));
        // const params = new URLSearchParams({
        //     response_type: 'code',
        //     client_id: spotifyClientId,
        //     scope: scope,
        //     redirect_uri: spotifyRedirectUri,
        //     state: state
        // })
        // console.log('Query String: ', params)
        // res.redirect('https://accounts.spotify.com/authorize?' + params.toString());
        // console.log(res)
    } catch (error) {
        console.error('Internal Server Error')
        res.status(500).json(error);
    }
}

module.exports = {
    loginAuth
};