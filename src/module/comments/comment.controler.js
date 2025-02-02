

const connection = require("../../../connect.DB.js");
const moment = require('moment');
 

exports.createcooment = (req,res,next)=>{

    const{descraption ,postID} = req.body 

    const userID = req.user.id

    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

    const query = `insert into comments(descraption,postID,userID,createdAt)
    values("${descraption}","${postID}","${userID}","${createdAt}")`

    connection.execute(query,(err,result)=>{
        if(err){
            return res.status(500).json(err)
    
            };

            if(result.affectedRows === 0){
            return res.status(401).json("comment not created")
    
            };
           
    
            return res.status(201).json("created")
    });
};

exports.deletecomment = (req,res,next)=>{

    const{ id } = req.params 

    const query = `delete from comments where comments.id = ${id} and userID = ${req.user.id}`

    connection.execute(query,(err,result)=>{
        if(err){
            return res.status(500).json(err)
    
            };

            if(result.affectedRows === 0){
            return res.status(401).json("comment not created")
    
            };
           
    
            return res.status(201).json("created") 
    });
};

exports.getall = async(req,res,next)=>{

    const{ postID } = req.body
     const userID = req.user.id
    
    const query = `select comments.* ,posts.title,posts.content,users.name ,users.username from comments join 
    posts on posts.id = comments.postID join users on users.id = comments.userID where comments.postID =${postID}`
      connection.execute(query,(err,result)=>{
        if(err){
            return res.status(500).json(err)
    
            };

            if(result.length === 0){
            return res.status(401).json("comment not exist")
           };
             
            const{...info} = result[0]
            return res.status(201).json(info) 
        });
        };
 