var http = require('http');
// 创建http服务
var app = http.createServer(function (req, res) {
    // 查询本机ip
    var sreq = http.request({
        host:'localhost', // 目标主机
        port:"8888",
        path:'/html5game/a_angular/index.html', // 目标路径
        method:   req.method // 请求方式
    }, function(sres){
        sres.pipe(res);
        sres.on('end', function(){
            console.log('done');
        });
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
});
app.listen(8999);
console.log('server started on 127.0.0.1:8999');