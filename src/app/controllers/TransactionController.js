const TransactionModel = require("../models/transaction.js");
const MemberModel = require("../models/member.js")

class TransactionController {
    async getAllTransaction(req, res, next) {
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        await TransactionModel.find({})
        .populate("bookId", "title")
        .populate("memberId")
        .then((transactions) => {
            res.status(200).json(transactions)
        })
        .catch(next)
    }

    async getTransaction(req, res, next) {
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        await TransactionModel.findOne({ _id: req.params.id })
        .then((transaction) => {
            res.status(200).json(transaction)
        })
        .catch(next)
    }

    async newBorrowTransaction(req, res, next) {
        const phoneNumber = req.body.phoneNumber
        let member = await MemberModel.findOne({ phoneNumber: phoneNumber })
        const bookId = req.body.bookId

        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        if (!phoneNumber) return res.status(400).json({msg: "Missing phone number"});

        if (!member) return res.status(404).json({msg: "This member does not exist"});
        
        const transaction = new TransactionModel({
            memberId: member._id,
            bookId: bookId,
            phoneNumber: phoneNumber,
            borrowDate: new Date(),
            status: "Borrowed"
        })

        await transaction
            .save()
            .then(() => {
                res.status(200).json({msg: "Borrow transaction created"})
            })
            .catch(next)
    }

    async updateReturnTransaction(req, res, next) {
        var timestamp = new Date().getTime() + (30 * 24 * 60 * 60 * 1000) //30 days timestamp

        const phoneNumber = req.body.phoneNumber
        // const member = MemberModel.findOne({ phoneNumber: phoneNumber })
        const member = await MemberModel.findOne({ phoneNumber: phoneNumber });
        const transactionId = req.params.id
        const returnDate = new Date()

        
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});
        
        if (!phoneNumber) return res.status(400).json({msg: "Missing phone number"});
        
        if (!member) return res.status(404).json({msg: "This member does not exist"});
        
        // const updateReturnTransaction = await TransactionModel.findByIdAndUpdate(
        //     transactionId,
        //     {
        //         $set: {
        //             returnDate: returnDate,
        //             status: "Returned"
        //         }
        //     },
        //     { new: true }
        // ).then(() => {
        //     res.status(200).json({msg: "Transaction updated", updateReturnTransaction})
        // }).catch(next)

        try {
            const updateReturnTransaction = await TransactionModel.findByIdAndUpdate(
                transactionId,
                {
                    $set: {
                        returnDate: returnDate,
                        status: "Returned"
                    }
                },
                { new: true }
            );
        
            // Trả về thông báo thành công cùng với giao dịch đã được cập nhật
            res.status(200).json({ msg: "Transaction updated", updateReturnTransaction });
        } catch (err) {
            // Xử lý lỗi nếu có và chuyển lỗi cho middleware
            next(err);
        }
        
        
    }
}

module.exports = new TransactionController()