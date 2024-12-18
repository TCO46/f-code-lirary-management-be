const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Book = new Schema(
    {
        title: { type: String, required: true},
        author: { type: String, required: true},
        description: { type: String, required: true},
        date: { type: Date, required: true },
        publisher: { type: String, required: true},
        language: { type: String, required: true },
        page: { type: Number, required: true }
    }
)

module.exports = mongoose.model("Book", Book)