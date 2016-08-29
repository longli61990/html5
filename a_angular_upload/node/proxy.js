var http = require('http');

var proxy = http.createServer(function(request, response) {
    var host = request.headers.host,port;
    console.log(request.headers.host+"  "+request.url+"  "+request.method);
    var path  = request.url;
    if(host.indexOf('yin.com')!=-1){
        host="localhost";
        port=8888;
        path+='.html';
    }else if(host.indexOf('api.yin.com')!=-1){
        host="live.admin.youja.cn";
    }
    console.log(request.headers.host+"  "+request.url+"  "+request.method+"  path="+path);
    var options = {
        host: host, // 这里是代理服务器
        port: port,             // 这里是代理服务器端口
        path: path,
        method: request.method,
        headers:{"Content-Type": 'application/x-www-form-urlencoded'}

    };

    var req = http.request(options, function(res) {
        console.log(res.statusCode);
        res.on('data',function (chunk) {
            console.log(chunk.toString());
            //response.write(chunk);
            //response.end();
        });
        res.pipe(response);
    });
    request.pipe(req);
    //req.write(require('querystring').stringify({"content":""}) + "\n");
    req.end();
}).listen(80);