
const Redis = require("ioredis");

const client = new Redis({
  
      port:process.env.redis_key,
      host: "127.0.0.1",
    });

    client.on('connect',()=>{

     console.log("connected to redis");
        
    })

    module.exports = client