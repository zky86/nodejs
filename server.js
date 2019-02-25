var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sql = require('./config/connect');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
   extended: false
})

app.use(express.static('public'));

app.get('/index.htm', function(req, res) {
   res.sendFile(__dirname + "/" + "index.htm");
})

app.get('/list.htm', function(req, res) {
   res.sendFile(__dirname + "/" + "list.htm");
})

app.post('/process_post', urlencodedParser, function(req, res) {
   // 输出 JSON 格式
   var response = {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name
   };
   console.log(response);
   var connection = sql()
   var addSql = 'INSERT INTO user(id,name,password) VALUES(0,?,?)';
   var addSqlParams = [req.body.first_name, req.body.last_name];
   //增
   connection.query(addSql, addSqlParams, function(err, result) {
      if (err) {
         console.log('[INSERT ERROR] - ', err.message);
         return;
      }
   });
   connection.end();

   res.end();

})

var server = app.listen(8081, function() {
   var host = server.address().address
   var port = server.address().port
   console.log("应用实例，访问地址为 http://%s:%s", host, port)

})