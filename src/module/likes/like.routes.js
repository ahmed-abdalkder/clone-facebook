
const { Router } = require("express");
const { IsLikeOnComment, gettAllLikes } = require("./like.controler.js");
const { author } = require("../../middleware/auth.js");

const router = Router()

router.post("/",author(),IsLikeOnComment);

router.get("/",author(),gettAllLikes);


module.exports = router