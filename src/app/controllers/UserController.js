class UserController {
    async getUser(req, res, next) {
        if (!req.user) return res.status(401).json({msg: "Unauthorized"});

        res.status(200).json(req.user)
    }
}

module.exports = new UserController()