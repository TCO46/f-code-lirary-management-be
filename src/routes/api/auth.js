const express = require("express");
const router = express.Router();

const AuthController = require("../../app/controllers/AuthController");

router.post("/login", AuthController.login);

module.exports = router;