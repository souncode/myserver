const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        require: true
    },
    pass: {
        type: String,
    },

});
const UserModel = db.model('user', userSchema);

module.exports = UserModel;