// auth spotify controller
const axios = require('axios');

const OAuth = async (req, res) => {
    const { token, input} = req.headers;
    const { access_token } = req.user;

    console.log("Input Value:", input);
    console.log("Token Value:", token);
    console.log("Access Value:", access_token);

    const data = await axios.get("https://api.spotify.com/v1/search", { // https://developer.spotify.com/documentation/web-api/reference/search
        headers: { // headers to auth with access token... 
            Authorization: `Bearer ${access_token}`
        },
        params: { // params to query
            q: input,
            type: 'track',
            limit: 10
        }
    });

    console.log(data.data.tracks);

    return res.status(200).json({
        success: true,
        message: `Valid tokens and input.`,
        data: data.data.tracks
    })
};

module.exports = {
    OAuth
}