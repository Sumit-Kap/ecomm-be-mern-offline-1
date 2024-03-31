const express = require('express');

const router = express.Router();

router.post('/signIn', (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("In test");
        req.error = { status: 404, message: 'API body incorrect' };
        next()
    }
});

router.post('/signUp', (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
});


module.exports = router;