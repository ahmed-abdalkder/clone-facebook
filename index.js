
const express = require('express')
const connection = require('./connect.DB.js')
const userrouter = require('./src/module/users/user.routes.js')
const postrouter = require('./src/module/posts/post.routes.js')
const commentrouter = require('./src/module/comments/comment.routes.js')
const likerouter = require('./src/module/likes/like.routes.js')
const friendrouter = require('./src/module/friends/friend.routes.js')
const client = require('./src/redis.js')
 

const app = express()
const port = process.env.PORT || 3006

app.use(express.json())

client
connection

app.use("/Users",userrouter)
app.use("/Posts",postrouter)
app.use("/Comments",commentrouter)
app.use("/Likes", likerouter)
app.use("/Friends", friendrouter)

 

app.use("*",(req, res) => res.json('url not found'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))