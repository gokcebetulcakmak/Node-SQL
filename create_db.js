var mysql = require('mysql');
var con = mysql.createConnection(
    {//Veritabanına giriş kimliği
        host: "localhost",
        user :"root",
        password: ""
    }
);

con.connect(function(err){
    if (err) throw err;
    console.log("Baglandi!");
    con.query("CREATE DATABASE nodedb", function(err, result){
        if(err) throw err;
        console.log("DB olusturuldu")
    })
})