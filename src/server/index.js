// node 后端服务器
const buyStatusApi = require('./api/buyStatusApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();



// 跨域设置
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// 后端api路由
app.use('/api/buy_status', buyStatusApi);



// 监听端口
app.listen(3000);

console.log('success listen at port:3000......');
