var mysql = require('mysql');
var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "nodedb"
    }
);

var kullanici_list=
[
{username:'kullanici3@hotmail.com',password:'757'},
{username:'kullanici4@hotmail.com',password:'6565'},
{username:'kullanici5@hotmail.com', password:'2452'},
{username:'kullanici6@hotmail.com', password:'9898'}
];

con.connect(function (err) {
    if (err) throw err;
    console.log("Baglandi!");
    var sql = "INSERT INTO user (username,password) VALUES (?, ?)";
    for(var i = 0; i< kullanici_list.length; i++){

    var degerler=[kullanici_list[i].username, kullanici_list[i].password];

    con.query(sql, degerler, function(err,result){
        if(err) throw err;
        console.log("1 Kayit oluşturuldu.");
    });
    }   
})