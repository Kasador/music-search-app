const router = require('express').Router();
const { getData } = require('../controller/authController');

router.get('/', getData);

module.exports = router;