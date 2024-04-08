const express = require('express');
const userController = require('../controllers/userController');
const googleController = require("../controllers/googleController");
const router = express.Router();

router.post('/signIn', userController.signIn);

router.post('/signUp', userController.signUp);

// router.get('google/init', googleController.initGoogleAuth);


// 401 - unauthorized
// 403 - forbidden - operation not permitted.
// 404 - resource not found


module.exports = router;