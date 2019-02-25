var app = require('http').createServer(handler)
var io = require('socket.io')(app); 
var fs = require('fs');

app.listen(8888);


//URL请求处理
/*
服务器web请求处理器
作用: 当客户端请localhost:8888时，打开默认页面 /index.html
*/
function handler (req, res) {
  //打开默认页面
  fs.readFile(__dirname + '/socket.htm',
  
  //响应处理方法
  function (err, data) {

    //情况1：如果 err 不为空，那么表示没有找到 /index.html
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    //情况2：找到了 /index.html
    res.writeHead(200);
    res.end(data);
  });
}


// socket请求处理
io.on('connection', function (socket) {

  // 向客户端的自定义事件'news'发送数据
  socket.emit('news', { hello: 'world' });
  
  // 创建自定义事件 my other event
  socket.on('my other event', function (data) {
    console.log(data);
  });
});