const router = require('express').Router();
const { getCallback } = require('../controller/callbackController');

router.get('/', getCallback); // api/v1/callback

module.exports = router;