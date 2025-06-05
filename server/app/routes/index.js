const router = require('express').Router();

router.get('/', (req, res) => { // api/v1 route
    res.status(200).json({
        success: true,
        message: `From /api/v1`,
    });
});

// router.use('/data', routerFileToController)

module.exports = router;