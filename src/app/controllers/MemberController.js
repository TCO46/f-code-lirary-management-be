const MemberModel = require("../models/member.js");

class MemberController {
    async getAllMember(req, res, next) {
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        await MemberModel.find({})
        .then((members) => {
            res.status(200).json(members)
        })
        .catch(next)
    }

    async getMember(req, res, next) {
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        await MemberModel.findOne({ phoneNumber: req.body.phoneNumber })
        .then((member) => {
            res.status(200).json(member)
        })
        .catch(next)
    }

    async newMember(req, res, next) {
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        if(MemberModel.findOne({ phoneNumber: req.body.phoneNumber })) return res.status(400).json({ msg: "Phone number already exist" })

        const member = new MemberModel({
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber
        })

        await member
            .save()
            .then(() => {
                res.status(200).json({msg: "Member created"})
            })
            .catch(next)
    }
    
    async deleteMember(req, res, next) {
        if (!req.user) return res.status(401).send("Unauthorized");

        await MemberModel.deleteOne({ phoneNumber: req.body.phoneNumber }).then(() => {
            res.status(200).json({msg: "Member deleted"})
        })
    }

    async updateMember(req, res, next) {
        if (!req.user) return res.status(401).send("Unauthorized");

        await MemberModel.updateOne({ phoneNumber: req.body.phoneNumber }, {
            active: false
        })
        .then(() => {
            res.status(200).json({msg: "Member updated"});
        })
        .catch(next);
    }
}

module.exports = new MemberController()