var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');
var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "nodedb"
    }
);

con.connect(function (err) {
    if (err) throw err;
    console.log("Baglandi!");
});


http.createServer(function (req, res) {

    fs.readFile('giris_form.html', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });

    var bilgi = url.parse(req.url, true).query;

    if (bilgi.ad && bilgi.sifre) {

        var sql = "SELECT username,password FROM user WHERE username = '"+bilgi.ad+"' AND password = '"+bilgi.sifre+"'";
     
        con.query(sql, function (err, result) {
            // console.log(result)
            if (result.length > 0) {
                console.log("Giriş başarılı")
            }
            else{
                console.log("Başarısız")
            }
        })
    }
}).listen(8080);
