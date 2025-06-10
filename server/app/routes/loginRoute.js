const router = require('express').Router();
const { loginAuth } = require('../controller/loginController');

router.get('/', loginAuth); // api/v1/login

module.exports = router;