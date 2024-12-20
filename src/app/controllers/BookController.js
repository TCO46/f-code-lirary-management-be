const BookModel = require("../models/Book");

class BookController {
    async getAllBook(req, res, next) {
        await BookModel.find({})
        .then((books) => {
            res.status(200).json(books)
        })
        .catch(next)
    }

    async getBook(req, res, next) {
        await BookModel.findOne({ _id: req.params.id })
        .then((book) => {
            res.status(200).json(book)
        })
        .catch(next)
    }

    async newBook(req, res, next) {
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        const book = new BookModel({
            title: req.body.title,
            cover: req.body.cover,
            author: req.body.author,
            description: req.body.description,
            date: req.body.date,
            publisher: req.body.publisher,
            language: req.body.language,
            page: req.body.page
        })

        await book
            .save()
            .then(() => {
                res.status(200).json({msg: "Book created"})
            })
            .catch(next)
    }

    async deleteBook(req, res, next) {
        if (!req.user) return res.status(401).send("Unauthorized");

        await BookModel.deleteOne({ _id: req.params.id }).then(() => {
            res.status(200).json({msg: "Book deleted"})
        })
    }

    async updateBook(req, res, next) {
        if (!req.user) return res.status(401).send("Unauthorized");

        await BookModel.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.status(200).json({msg: "Book updated"});
        })
        .catch(next);
    }
}

module.exports = new BookController();