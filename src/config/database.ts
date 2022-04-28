import mysql from "mysql"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tset',
    password: 'password'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

export default connection;