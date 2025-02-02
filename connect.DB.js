 
 const mysql = require('mysql2');

 
 const connection = mysql.createConnection(
  {
   host: 'b8ayi5gydrcvcvde6uem-mysql.services.clever-cloud.com',
   user: 'unfi4twxp3cfsnxm',
   password:"adgfIFcb1OnmdbjqwvG6",
   database: 'b8ayi5gydrcvcvde6uem',
 }
);
 connection.connect((err)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log("conction database successfuly");
        
    }

 })
 module.exports = connection