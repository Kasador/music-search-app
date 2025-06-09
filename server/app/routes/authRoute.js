const router = require('express').Router();
const { getData } = require('../controller/authController');

router.get('/', getData); // api/v1/auth

module.exports = router;