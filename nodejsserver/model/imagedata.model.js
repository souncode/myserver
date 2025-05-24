const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const boundingBoxSchema = new Schema({
    label: { type: String, required: true },
    rect: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },
});

const imageDataSchema = new Schema({
    name: { type: String, required: true },
    folder: { type: String, required: true },
    url: { type: String, required: true },
    thumbUrl: { type: String, required: true },
    labelUrl: { type: String },
    size: { type: Number },
    boundingBoxes: [boundingBoxSchema],
    createdAt: { type: Date, default: Date.now },
});

const ImageDataModel = db.model('ImageData', imageDataSchema);

module.exports = ImageDataModel;

