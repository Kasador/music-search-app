const router = require('express').Router();
const loginRoute = require('./loginRoute.js')
const callbackRoute = require('./callbackRoute.js')
const authRoute = require('./authRoute.js')

router.get('/', (req, res) => { // api/v1 route
    res.status(200).json({
        success: true,
        message: `From /api/v1`,
    });
});


router.use('/auth', authRoute); // api/v1/auth
router.use('/login', loginRoute); // api/v1/login
router.use('/callback', callbackRoute); // api/v1/callback

module.exports = router;