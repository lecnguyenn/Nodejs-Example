const http = require('http');
const fs = require('fs');
const path = require('path');


const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) =>{
    console.log('Request for ' + req.url + 'by method' + req.method );

    if(req.method == 'GET'){
        var fileURL;
        if(req.url =='/' ) fileURL ='/index.html';
        else  fileURL = req.url;

        var filePath = path.resolve('./public' + fileURL)
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.stat(filePath, function(err, stat){
                if(err){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404:' + fileURL + 'not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1></h1>Error 404:' + fileURL + 'not an HTML file</body></html>');
            return;
        }
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404:' + req.method +'not support</h1></body></html>')
    }


    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<htm><body><h1>Hello, World!</h1></body></html>')
})

server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});