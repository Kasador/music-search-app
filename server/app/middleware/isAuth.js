// auth middleware
const isAuth = async (req, res, next) => {
    console.log('middleware');
    req.user = 'Hunter';
    next();
}

module.exports = isAuth;