const authRouter = require("./api/auth");
const bookRouter = require("./api/book")
const userRouter = require("./api/user");

const AuthController = require("../app/controllers/AuthController");

function route(app) {
	app.use("/api/*", AuthController.getUser);

	app.use("/api/auth", authRouter);

	app.use("/api/book", bookRouter)
}

module.exports = { route }
