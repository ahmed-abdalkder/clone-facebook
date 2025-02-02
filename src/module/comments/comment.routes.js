
const { Router } = require("express");
const { createcooment, deletecomment, getall } = require("./comment.controler.js");
const { author } = require("../../middleware/auth.js");

const router = Router()

router.post("/",author(),createcooment);

router.delete("/:id",author(),deletecomment);

router.get("/",author(),getall);


module.exports = router