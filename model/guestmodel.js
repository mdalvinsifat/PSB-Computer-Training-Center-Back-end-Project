
const mongoose = require("mongoose")


const GuestModel = mongoose.Schema({
    name:{
        type:String
    }, 
    course:{
        type:String,
    },
    address:{
        type:String
    },
    phone:{
        type:String
    }

    
})


const Guest = mongoose.model("guest", GuestModel)

module.exports = Guest 