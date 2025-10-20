const mongoose = require("mongoose");
require("colors"); // Make sure you have this to use .bgYellow, .bgRed

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database Successfully Connected".bgGreen.black);
    } catch (error) {
        console.error("❌ Database Connection Failed".bgRed.white);
        console.error(error.message);
        process.exit(1); // Optional: stop the app if DB fails
    }
};

module.exports = ConnectDB;
