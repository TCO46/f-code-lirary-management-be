const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")

class Database {
    async connect() {
        try {
            await mongoose.connect(String(process.env.MONGO_URI))
            console.log("Connected to the mongoDB");
        } catch(err) {
            console.log(`Connect failed ${err}`)
        }
    } 
}

module.exports = { Database }