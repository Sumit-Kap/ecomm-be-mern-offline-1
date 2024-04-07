const Users = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
    signUpService: (reqBody, cb) => {
        const { email, password, confirmPassword } = reqBody;
        console.log('pp', process.env.SALT);
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))
        const maskedPwd = bcrypt.hashSync(password, salt);
        const users = new Users({
            email: email,
            password: maskedPwd,
            confirmPassword: maskedPwd
        });

        users.save().then((response) => {
            cb(null, { status: 200, data: response })
        }).catch((err) => {
            cb({ status: 503, message: err }, null)
        })
    },
    signInService: async (reqBody, callback) => {
        const { email, password } = reqBody;
        try {
            const existingUser = await Users.findOne({ email: email });
            const maskedPwd = existingUser.password;

            const isPasswordCorrect = bcrypt.compareSync(password, maskedPwd);
            console.log("isCorrectpwd", isPasswordCorrect);
            if (isPasswordCorrect) {
                const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.PRIVATE_KEY, { expiresIn: '10h', algorithm: 'HS256' })
                callback(null, {
                    status: 200,
                    data: {
                        token
                    }
                })
            }
        } catch (err) {
            callback({ status: 503, message: err }, null)
        }
    }
};


module.exports = userService;