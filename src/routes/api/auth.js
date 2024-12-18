const express = require("express");
const router = express.Router();

const AuthController = require("../../app/controllers/AuthController");

router.post("/login", AuthController.login);

router.get("/test", (req, res) => {
	res.redirect("/home");
})

module.exports = router;
