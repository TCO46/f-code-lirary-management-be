const authRouter = require("./api/auth");
const userRouter = require("./api/user");

const AuthController = require("../app/controllers/AuthController");

function route(app) {
	app.use("/api/*", AuthController.getUser);

	app.use("/api/auth", authRouter);
}

module.exports = { route }
