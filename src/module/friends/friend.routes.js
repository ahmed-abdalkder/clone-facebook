const { Router } = require("express");
const { addfriend, getfriends, deletefriends } = require("./friend.controler.js");
const { author } = require("../../middleware/auth.js");

const router = Router()

router.post("/",author(),addfriend);

router.get("/",author(),getfriends);

router.delete("/",author(),deletefriends);


module.exports = router