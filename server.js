var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./config/connect');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
   extended: false
})
app.use(express.static('public'));

// 首页 
app.get('/index.htm', function(req, res) {
   res.sendFile(__dirname + "/" + "index.htm");
})

// 列表页 
app.get('/list.htm', function(req, res) {
   res.sendFile(__dirname + "/" + "list.htm");
})

// 首页--写入数据库接口
app.post('/process_post', urlencodedParser, function(req, res) {
   // res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
   // 输出 JSON 格式
   var response = {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name
   };
   console.log(response);
   var connection = db()
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
   var json = {
      code: 200, 
      msg: '成功',
   };
   res.json(json)
   res.end();
})


// 列表页--读取数据库接口
app.post('/process_get', urlencodedParser, function(req, res) {
   var connection = db()
   var  sql = 'SELECT * FROM user';
   connection.query(sql,function (err, result) {
      if(err){
         console.log('[SELECT ERROR] - ',err.message);
         return;
      }
      result=JSON.stringify(result)
      res.end(result);
   });
   
})

// 启动node服务器
var server = app.listen(8081, function() {
   var host = server.address().address
   var port = server.address().port
   console.log("启动成功")
   // console.log("应用实例，访问地址为 http://%s:%s", host, port)
})