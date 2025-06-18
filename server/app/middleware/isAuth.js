// auth middleware
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    const { token } = req.headers;
    console.log('Middleware Token Value:', token);

    const access = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Middleware Token Decoded:', access);
    console.log('Middleware Access Token', access.access_token);
    // const accessToken = access.access_token

    // req.user = accessToken;
    req.user = access;
    // req.headers.accessToken;
    // next((req) = () => {
    //     req.headers = accessToken;
    // });
    next();
}

module.exports = isAuth;