const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Member = new Schema(
    {
        fullName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        active: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Member", Member);
