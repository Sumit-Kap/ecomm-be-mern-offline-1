const express = require('express');
const googleController = require('../controllers/googleController');

const router = express.Router();

router.get('/callback', googleController.handleCallback);

router.get('/init', googleController.initGoogleAuth);



// 401 - unauthorized
// 403 - forbidden - operation not permitted.
// 404 - resource not found


module.exports = router;