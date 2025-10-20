const mongoose = require("mongoose")


const AdmissionModel = mongoose.Schema({
    name : {
        type : String , 
        required : true 
    }, 

    address :{
        type :String 
    }, 
    phone :{
        type:String ,
        required:true 
    }, 
    description : {
        type :String
    },
   email :{
    type:String 
   }
})

const Admission = mongoose.model("admission",AdmissionModel)

module.exports = Admission