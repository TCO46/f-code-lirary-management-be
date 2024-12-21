const express = require("express");
const router = express.Router();

const TransactionController = require("../../app/controllers/TransactionController");

router.get("/", TransactionController.getAllTransaction)

router.get("/:id", TransactionController.getTransaction)

router.post("/new", TransactionController.newBorrowTransaction)

router.put("/update/:id", TransactionController.updateReturnTransaction)

// router.delete("/delete/:id", TransactionController)

module.exports = router;