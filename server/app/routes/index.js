const router = require('express').Router();
const login = require('./loginRoute.js')
const callback = require('./callbackRoute.js')

router.get('/', (req, res) => { // api/v1 route
    res.status(200).json({
        success: true,
        message: `From /api/v1`,
    });
});

router.use('/login', login); // api/v1/login
router.use('/callback', callback); // api/v1/callback

module.exports = router;