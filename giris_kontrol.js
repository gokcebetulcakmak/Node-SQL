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

        var sql = "SELECT * FROM user";

        con.query(sql, function (err, result) {
            //    console.log("Gelenn");
            //    console.log(result);
            //    console.log("Giden");
            //    console.log(bilgi);

            var giris = false;
            for (var i = 0; i < result.length; i++) {
                if (result[i].username == bilgi.ad && result[i].password == bilgi.sifre) {
                    giris = true;
                }
            }
            if (giris == true) {
                console.log("Giris başarılı");

            }
            else {
                console.log("Lütfen doğru kullanıcı adı ve şifre giriniz.")
            }
        })
    }
}).listen(8080);
