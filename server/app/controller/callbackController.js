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

        // const newAuth = new Auth({
        //     access_token: data.access_token,
        //     expires_in: data.expires_in,
        //     refresh_token: data.refresh_token,
        //     user_id: userData.id
        // }); // https://mongoosejs.com/docs/timestamps.html // https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
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

        console.log('JWT Token: ', token);

        res.redirect(`https://hunterstevenshaw-music-search-app.netlify.app/?token=${token}`); // redirect with saved token in a query string to unlock protected routes.
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