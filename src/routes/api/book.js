const express = require("express");
const router = express.Router();

const BookController = require("../../app/controllers/BookController");

router.get("/", BookController.getAllBook)

router.get("/:id", BookController.getBook)

router.post("/new", BookController.newBook)

router.put("/update/:id", BookController.updateBook)

router.delete("/delete/:id", BookController.deleteBook)

module.exports = router;