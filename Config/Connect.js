const mongoose = require("mongoose");
require("colors");

const ConnectDB = async () => {
    try {
        mongoose.connect(process.env.MONGOOSE)
        console.log("mongoose connect done")
      
    } catch (error) {

       
    }
};

module.exports = ConnectDB;