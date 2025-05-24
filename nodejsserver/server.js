const express = require('express');
const path = require('path');

const app = require('./app');
// Cấu hình cổng
const portApi = 3000;
//const portWeb = 80;


app.use(express.static('./xtth.wap.sh'));

app.get('/tc', (req, res) => {
    res.send("Get from server successfully");
});

app.get('/', (req, res) => {
    res.sendFile(path.join('/home/soun/workspace/xtth.wap.sh', 'index.html'));
});
//app.listen(portWeb, "0.0.0.0", () => {
//  console.log(`Web server running at http://0.0.0.0:${portWeb}`);
//});

// Lắng nghe trên port 3000 cho API
app.listen(portApi, "0.0.0.0", () => {
    console.log(`API server running at http://0.0.0.0:${portApi}`);
});

