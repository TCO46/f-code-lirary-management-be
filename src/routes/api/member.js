const express = require("express");
const router = express.Router();

const MemberController = require("../../app/controllers/MemberController");

router.get("/", MemberController.getAllMember)

router.get("/:id", MemberController.getMember)

router.post("/new", MemberController.newMember)

router.put("/update", MemberController.updateMember)

router.delete("/delete", MemberController.deleteMember)

module.exports = router;