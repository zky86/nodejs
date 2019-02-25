function sql() { 
    var mysql  = require('mysql');  
    var connection = mysql.createConnection({     
      host     : 'localhost',       
      user     : 'root',              
      password : 'root',       
      port: '3306',                   
      database: 'tp5' 
    }); 
    connection.connect();
    return connection;
}; 
module.exports = sql;