
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const client = require("../../redis.js");
const connection = require("../../../connect.DB.js")
const sendMail = require("../../service/sendemail.js");
 
 
 
 
exports.register = async(req,res,next)=>{

    const{name, username, password, email} = req.body

    connection.execute(`select  * from users where email = "${email}"`,(err,result)=>{
    if(err){
       return res.status(401).json(err)
    };

   if(result.length){
    return res.status(500).json("user slready exist")
   };
   
   const hash = bcrypt.hashSync(password,10)

   const token = jwt.sign({email,username},process.env.validation_token)
   const link = `http://localhost:3000/Users/confirm/${token}`;

   sendMail(email,"hello",`<a href="${link}"> click her your link</a>`)

 const query = `insert into users (name,username,password,email)values("${name}","${username}","${hash}","${email}")`;
   connection.execute(query,(err,result)=>{
 if(err){
    return res.status(401).json(err)
 };

   if(result.affectedRows === 0){

    return res.status(500).json("user not created")
 };

   return res.status(201).json({msg:"done" })

    });
  });

};

exports.confirm = async(req,res,next)=>{

    const{token} = req.params 
     
    const decoded = jwt.verify(token,process.env.validation_token)

    if(!decoded){

        res.status(401).json("invalidtoken")
    };

     connection.execute(`select * from users where email="${decoded.email}"`,(err,result)=>{
        if(err){
            return res.status(500).json(err)
         };

         const{...info} = result[0];

         return res.status(200).json({msg:"done",info});
    
    });
};

exports.signin = (req,res,next)=>{

  const{password, email} = req.body 

  connection.execute(`select * from users where email = "${email}"`,(err,result)=>{
    if(err){
      return res.status(500).json(err)
    };

    if(!result.length){
      return res.status(500).json("user dose not exist")
  };

  const passwordmatch = bcrypt.compareSync(password,result[0].password)
  if(!passwordmatch){
    return res.status(500).json("invalid password")
  };

    const token = jwt.sign({id:result[0].id,email},process.env.validation_token);

    const{...info} = result[0];

    return res.status(200).json({msg:"done",token});

  });
};

exports.getAllusers = async(req,res,next)=>{

  const caching = await client.get('users')

  if(caching){
    return res.status(200).json({msg:"done",users: caching})
};

  const query = `select * from users `
  connection.execute(query,(err,result)=>{
    if(err){
      return res.status(500).json(err)

    };

    const{...info} = result

   client.set('users',JSON.stringify(info))


    return res.status(200).json(info)

  });
};

exports.getUser = async(req,res,next)=>{

const caching = await client.get(`users:${req.user.id}`)

  if(caching){
    return res.status(200).json(caching)
   };

  const query = `select * from users where id ="${(req.user.id)}"`

  connection.execute(query,(err,result)=>{
    if(err){
      return res.status(500).json(err)
     };
   
    const{...info} = result

      client.set(`users:${req.user.id}`,JSON.stringify(info));


    return res.status(200).json(info);

  });
};

exports.updateUser = (req,res,next)=>{

    const{name, username, password} = req.body

    connection.execute(`select * from users where id = "${(req.user.id)}"`,(err,result)=>{
      if(err){
        return res.status(401).json(err)
     };

    if(!result.length){
     return res.status(500).json("user dose not exist")
    };

   
    const hash = bcrypt.hashSync(password,10);
     
  
    const query = `UPDATE users SET name ="${name}",username ="${username}",password ="${hash}" where id = "${(req.user.id)}"`
    connection.execute(query,(err,result)=>{
    if(err){
      return res.status(401).json(err)
   };
   
   if (result.affectedRows === 0) {
     return res.status(400).json("Failed to update user.");
   } ;

      return res.status(200).json( "updated")
     });
   });
 };
 
exports.loggout = (req,res)=>{
  
  return res.status(200).json( "done")

}