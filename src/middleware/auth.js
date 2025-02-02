const jwt = require("jsonwebtoken")
const connection = require("../../connect.DB.js")

exports.author = ()=>{

    return (req,res,next)=>{

        const{token} = req.headers
        if(!token){
          return res.status(500).json("token dose not exist")

        };

        if(!token.startsWith(process.env.token_key)){

         return res.status(500).json("invalid token ")
         };

         const newtoken = token.split(process.env.token_key)[1]
         if(!newtoken){
         return res.status(500).json("invalid newtoken ")
         };

         const decoded = jwt.verify(newtoken,process.env.validation_token)
         if(!decoded?.id){
         return res.status(500).json("invalid user ")

         };
         connection.execute(`select * from users where id = "${decoded.id}"`,(err,result)=>{
            if(err){
                return res.status(500).json(err)
              };

              if(!result.length){
                return res.status(500).json("user dose not exist")
            };

            const{...user} = result[0]
            
            req.user = user
            
            next()
         });
    }
};