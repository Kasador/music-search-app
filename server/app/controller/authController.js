// auth spotify controller
const axios = require('axios');

const OAuth = async (req, res) => {
    const { token, input} = req.headers;
    const { accessToken } = req.user;

    // console.log("Input Value:", input);
    // console.log("Token Value:", token);
    // console.log("Access Value:", accessToken);

    const resData = await axios.get("https://api.spotify.com/v1/search", { // https://developer.spotify.com/documentation/web-api/reference/search
        headers: { // headers to auth with access token... 
            Authorization: `Bearer ${accessToken}`
        },
        params: { // params to query
            q: input,
            type: 'track,album,artist',
            limit: 50
        }
    });
    
    console.log(resData.data.tracks);

    return res.status(200).json({
        success: true,
        message: `Valid tokens and input.`,
        data: resData.data
    })
};

module.exports = {
    OAuth
}