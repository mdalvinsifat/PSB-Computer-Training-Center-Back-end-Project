const mongoose = require("mongoose")



const ContactModel = mongoose.Schema({
    name :{
        type:String , 
    }, 
    descriptions:{
        type:String, 
    },
    phone:{
        type:String
    }
})


const Contact = new mongoose.model("contact", ContactModel)

module.exports  = Contact