const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const lineRouter = require('./routers/line.router');
const userRouter = require('./routers/user.router');
const projRouter = require('./routers/project.router');
const uploadRouter = require('./routers/upload.router');
const deviceRouter = require('./routers/device.router');
const path = require('path');


const app = express();


app.use(express.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', lineRouter);
app.use('/', userRouter);
app.use('/', deviceRouter);
app.use('/', uploadRouter);
app.use('/', projRouter);

module.exports = app;
