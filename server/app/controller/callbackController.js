// auth controller 
const axios = require('axios');
const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
// https://developer.spotify.com/documentation/web-api/tutorials/code-flow

const getCallback = async (req, res) => {
    try {
        const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
        const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const jwtSecret = process.env.JWT_SECRET;

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

        // console.log('code', code) // make the doc to save into db
        console.log("Data that came back from res", response.data)
        const data = response.data;

        let userOptions = {
            url: 'https://api.spotify.com/v1/me',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${data.access_token}`
            }
        }

        const userResponse = await axios(userOptions);
        console.log("User ID: ", userResponse.data);
        const userData = userResponse.data

        const newAuth = new Auth({
            access_token: data.access_token,
            expires_in: data.expires_in,
            refresh_token: data.refresh_token,
            user_id: userData.id
        }); // https://mongoosejs.com/docs/timestamps.html // https://mongoosejs.com/docs/api/document.html#Document.prototype.save()

        // deconstruct tokens // https://www.youtube.com/watch?v=AcYF18oGn6Y
        const { access_token, refresh_token } = data;

        const token = jwt.sign( // https://www.npmjs.com/package/jsonwebtoken
            { access_token, refresh_token },
            jwtSecret,
            { expiresIn: '1hr'}
        );

        console.log('JWT Token: ', token);
        console.log("Data to be saved: ", newAuth);
        // save data to database
        await newAuth.save();

        res.redirect(`http://localhost:5173/?token=${token}`); // redirect with saved token in a query string to unlock protected routes.
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