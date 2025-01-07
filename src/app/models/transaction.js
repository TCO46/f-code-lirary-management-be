const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Transaction = new Schema(
    {
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
        // bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        bookId: {type: String, ref: "Book", require: true},
        phoneNumber: { type: String, required: true },
        borrowDate: { type: Date, default: Date.now },
        returnDate: { type: Date },
        status: { 
            type: String, 
            enum: ['Borrowed', 'Returned'], 
            default: 'Borrowed' 
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Transaction", Transaction);
