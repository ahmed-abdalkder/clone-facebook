
const moment = require('moment')
const connection = require('../../../connect.DB.js')

exports.IsLikeOnComment = (req,res,next)=>{

    const{likly, postID} = req.body 

    const userID = req.user.id

    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

    const query = `select * from likes where userID = "${userID}"`

    connection.execute(query,(err,result)=>{

    if(err){
        return res.status(500).json(err)
       };

        if(result.length != 0){
        
        connection.execute( `delete from likes where userID = "${userID}"`,(err,result)=>{

            if(err){
                return res.status(500).json(err)
        
                };
                
            return res.status(201).json("deleted")

            });
        }else{

        const Query = `insert into likes(likly,postID,userID,createdAt)
              values("${likly}","${postID}","${userID}","${createdAt}")`

        connection.execute(Query ,(err,result)=>{

            if(err){
                return res.status(500).json(err)
         };
            
            });  

          
            return res.status(201).json({msg:"done"})
        };
    });
};

exports.gettAllLikes = (req,res)=>{

    const{ postID } = req.body 

    const query = `select likes.*,posts.title,posts.content from likes join posts on likes.postID where likes.postID= ${postID}`
    connection.execute(query,(err,result)=>{
        if(err){
            return res.status(500).json(err)
           };

             const{...info} = result;

            return res.status(201).json({msg:"done",info})

    });
};