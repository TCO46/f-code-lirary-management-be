const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

class AuthController {
    async login(req, res, next) {
        if(req.user) return res.status(400).json({ message: "User already logged in" })
        
        let User = await UserModel.findOne({ username: req.body.username })

        if(!User) return res.status(400).json({ message: "User not found" })

        try {
            if(await req.body.password === User.password) {
                const token = jwt.sign({ username: User.username, id: User._id }, String(process.env.ACCESS_TOKEN_SECRET), {
                    expiresIn: "1d"
                });
                const refreshToken = jwt.sign(
					{ username: User.username, id: User._id },
					String(process.env.REFRESH_TOKEN_SECRET),
					{ expiresIn: "7d" },
                )

                return res.status(200).json({ status: "Logged in", token: token, refreshToken: refreshToken, user: User });
            }
            else {
                return res.status(400).json({ message: "Incorrect password" });
            }
        } catch(err) {
            next(err)
        }
    }
    
    getUser(req, res, next) {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (!authHeader || !token) return next();

		jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
			if (err) return next(err);

			req.user = user;
			next();
		});
	}
}

module.exports = new AuthController();