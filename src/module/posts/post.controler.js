
const moment = require("moment")
const connection = require("../../../connect.DB.js")
const client = require("../../redis.js")


exports.createpost = (req,res,next)=>{

    const{title, content} = req.body

    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

     const userID = req.user.id;

    const query = `insert into posts (title ,content,createdAt,userID )
    values("${title}","${content}","${createdAt}","${userID}")`

    connection.execute(query,(err,result)=>{
        if(err){
        return res.status(500).json(err)

        };

        if(result.affectedRows === 0){
        return res.status(401).json("post not created")

        };
       

        return res.status(401).json("created")

    });
};

exports.gettAll = async (req,res,next)=>{

    const{ userID } = req.body 
   
    const caching = await client.get(`posts:${userID}`)

    if(caching){
        return res.status(200).json(JSON.parse(caching))
    }

    const query = `select posts.*,username,name,email from posts join users on users.id = posts.userID 
      where posts.userID = ${userID}  ORDER BY posts.createdAt DESC`

     const [post] = await connection.execute(query,[userID])
        
            if(post.length === 0){
            return res.status(401).json("post not created")
    
            }
            
         client.set(`posts:${userID}`,JSON.stringify(post))
             
            return res.status(401).json({msg:"done", post})
     
};

exports.deleteposts = (req,res,next)=>{

    const{ id } = req.params 
   
    const query = `delete from posts where posts.id =${id} and userID = ${req.user.id}`
    connection.execute(query,(err,result)=>{
        if(err){
            return res.status(500).json(err)
         };

            if(result.affectedRows === 0 || result.length === 0){

            return res.status(401).json("post dose not exist or post not delete")
    
            } ;

            return res.status(401).json({msg:"deleted"})

    });
 
};