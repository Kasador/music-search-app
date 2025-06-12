const router = require('express').Router();
const { getCallback } = require('../controller/callbackController');
const cors = require('cors');

router.use(cors());

router.get('/', getCallback); // api/v1/callback

module.exports = router;