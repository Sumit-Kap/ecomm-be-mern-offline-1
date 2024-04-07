const userService = require("../service/userService");

const userController = {
    signIn: (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            req.appError = { status: 400, message: 'API body incorrect' }; // bad request
            next()
        } else {
            userService.signInService(req.body, (err, response) => {
                if (err) {
                    req.appError = err;
                    next();
                }
                else {
                    res.cookie('session-cookie', response.data.token, { maxAge: 900000 })
                    // res.redirect("/");
                    res.status(response.status).json(response);
                }
            })
        }
    },
    signUp: (req, res, next) => {
        const { email, password, confirmPassword } = req.body;
        console.log("print---", req.body);
        if (!email || !password || !confirmPassword) {
            req.appError = { status: 400, message: 'API body incorrect' }; // 400 bad request
            next()
        } else {
            userService.signUpService(req.body, (err, response) => {
                if (err) {
                    req.appError = err;
                    next();
                } else {
                    res.status(response.status).json(response.data);
                }
            })
        }
    
    }
}

module.exports = userController;