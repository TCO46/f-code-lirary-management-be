const authRouter = require("./api/auth");
const bookRouter = require("./api/book");
const memberRouter = require("./api/member")
const transactionRouter = require("./api/transaction")
const userRouter = require("./api/user");

const AuthController = require("../app/controllers/AuthController");

function route(app) {
	app.use("/api/*", AuthController.getUser);

	app.use("/api/auth", authRouter);

	app.use("/api/book", bookRouter)

	app.use("/api/member", memberRouter)

	app.use("/api/transaction", transactionRouter)
}

module.exports = { route }
