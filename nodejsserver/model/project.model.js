const mongoose = require('mongoose');
const db = require('../config/db');
const UserModel = require('./user.model')

const { Schema } = mongoose;

const projectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    time: {
        type: String,

    },
    classes: {
        type: [String],

    },
});


const ProjectModel = db.model('project', projectSchema);

module.exports = ProjectModel;