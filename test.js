var sql = require('./config/connect'); 
var connection = sql()

 
var  addSql = 'INSERT INTO user(id,name,password) VALUES(0,?,?)';
var  addSqlParams = ['菜鸟2工e', 'https://c.runoob.com'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
   if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
   }        

   console.log('--------------------------INSERT----------------------------');
   //console.log('INSERT ID:',result.insertId);        
   console.log('INSERT ID:',result);        
   console.log('-----------------------------------------------------------------\n\n');  
});
 
connection.end();