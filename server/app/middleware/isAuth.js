// auth middleware
const isAuth = async (req, res, next) => {
    const { token } = req.headers;

    console.log('Middleware Token Value:', token);
    next();
}

module.exports = isAuth;