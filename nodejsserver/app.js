const express = require('express');
const cors = require('cors'); // ✅ Import CORS
const bodyParser = require('body-parser');
const lineRouter = require('./routers/line.router');
const uploadRouter = require('./routers/upload.router');
const deviceRouter = require('./routers/device.router');
const path = require('path');


const app = express();

// ✅ Bật CORS cho tất cả domain (tạm thời)
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', lineRouter);
app.use('/', deviceRouter);
app.use('/', uploadRouter);

module.exports = app;
