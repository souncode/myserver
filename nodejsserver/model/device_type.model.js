const mongoose = require('mongoose');
const db = require('../config/db');
    

const { Schema } = mongoose;

const deviceSchema = new Schema({
    type: {
        type: String,
        required: true,
    }, 
});


const DeviceModel = db.model('device', deviceSchema);

module.exports = DeviceModel;