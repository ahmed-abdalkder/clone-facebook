
const { Router } = require("express");
const { author } = require("../../middleware/auth.js");
const { register, confirm, getAllusers, getUser, signin, updateUser, loggout } = require("./user.controler.js");

const router = Router()

router.post("/",register);

router.get("/confirm/:token",confirm);

router.get("/allusers",getAllusers);

router.get("/",author(),getUser);

router.post("/signin",signin);

router.put("/",author(),updateUser);

router.patch("/",author(),loggout);



module.exports = router