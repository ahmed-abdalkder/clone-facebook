

const { Router } = require("express");
const { author } = require("../../middleware/auth.js");
const { createpost, gettAll, deleteposts } = require("./post.controler.js");

const router = Router()

router.post("/",author(),createpost);

router.get("/",author(),gettAll);

router.delete("/:id",author(),deleteposts);


module.exports = router