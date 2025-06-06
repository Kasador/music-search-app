// auth controller 
const axios = require('axios');
const Auth = require('../models/Auth');

const getData = async (req, res) => {
    try {
        const apiKey = process.env.SPOTIFY_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: 'Api key is missing from the env variables.',
                method: req.method
            });

            const getAuth = await Auth.find();

            return res.status(200).json({
                success: true,
                data: getAuth
            })
        }
    } catch (error) {
        
    }
}

module.exports = {
    getData
};