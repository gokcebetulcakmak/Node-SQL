var http = require('http');
var url =require('url');
var fs =require('fs');
var mysql = require('mysql');
var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "nodedb"
    }
);
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});

    fs.readFile('form.html',function(err,data){
        if (err){
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end();
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    });

    var bilgi =url.parse(req.url,true).query;
    if(bilgi.ad && bilgi.sifre){
    console.log(bilgi.ad);
    console.log(bilgi.sifre);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Baglandi!");
        var sql = "INSERT INTO user (username,password) VALUES (?, ?)";

        var degerler=[bilgi.ad, bilgi.sifre];
    
        con.query(sql, degerler, function(err,result){
            if(err) throw err;
            console.log("1 Kayit oluşturuldu.");
        });
        
    })
    }

}).listen(8080);