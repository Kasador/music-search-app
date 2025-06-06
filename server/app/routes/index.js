const router = require('express').Router();
const auth = require('./authRoute.js')

router.get('/', (req, res) => { // api/v1 route
    res.status(200).json({
        success: true,
        message: `From /api/v1`,
    });
});

router.use('/OAuth', auth)

module.exports = router;