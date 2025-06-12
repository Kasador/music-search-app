const router = require('express').Router();
const { OAuth } = require('../controller/authController')
const isAuth = require('../middleware/isAuth')

router.get('/', isAuth, OAuth);

module.exports = router;