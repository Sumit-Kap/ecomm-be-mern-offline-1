const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true},
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
