const connection = require("../../../connect.DB.js")


exports.addfriend = (req,res)=>{

    const{ userID } = req.body 

    const friendID = req.user.id

    connection.execute(`select * from friends where(userID = ${userID} and friendID = ${friendID})
        or (userID = ${userID} and friendID = ${friendID})`,(err,result)=>{

        if(err){
            return res.status(500).json(err)
    
            };

            if(result.length > 0){
            return res.status(401).json("friendes already exist")
    
            } ;

           connection.execute(`insert into friends(userID,friendID)values(${userID},${friendID})`,(err,result)=>{
            if(err){
                return res.status(500).json(err)
        
                }
                // if(result.length > 0){
                // connection.execute(`insert into users(friends.friendID)values(${friendID})where users.userID =${userID} and
                //     insert into users(friends.userID)values(${userID})where users.friendID =${friendID}`,
                //     (err,result)=>{
                //         if(err){
                //             return res.status(500).json(err)
                    
                //             }
                     const{...info} = result[0]


                          return res.status(201).json(info) 

                })
        
                // }

    //        })
      });
};

exports.getfriends = (req,res)=>{

    const friendID = req.user.id

    const query = `select friends.* ,users.name,users.email from friends left join users ON friends.userID = users.id where friends.friendID = ${friendID}`
    connection.execute(query,(err,result)=>{
        if(err){
            return res.status(500).json(err)
    
            };

            const{...info} = result[0];

            return res.status(200).json({msg:"done",info})

    });
};

exports.deletefriends = (req,res)=>{

    const{ userID } = req.body

    const friendID = req.user.id

    const query = `delete from friends  where friends.friendID = ${friendID} and  userID = ${userID}`
    connection.execute(query,(err,result)=>{
        if(err){
            return res.status(500).json(err)
    
            };

            if(result.affectedRows === 0){
                return res.status(401).json("friendes not delete")
        
                };
                
            return res.status(200).json( "done" )

    });
};