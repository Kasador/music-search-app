// auth controller 
const axios = require('axios');
const Auth = require('../models/Auth');

const getData = async (req, res) => {
    try {
        const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
        const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

        if (!spotifyClientId || !spotifyClientSecret) {
            return res.status(500).json({
                error: 'Api credentials are missing from the env variables.',
                method: req.method
            });
        }

        // const getAuth = await Auth.find();

        return res.status(200).json({
            success: true,
            // data: getAuth
            message: `From /api/v1/auth`,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getData
};