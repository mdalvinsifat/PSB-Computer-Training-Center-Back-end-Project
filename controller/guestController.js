const Contact = require("../model/contactModel");
const Guest = require("../model/guestmodel");






// create Controller 
const createControllerGuest = async(req, res) =>{
    try {
        const {name , course, phone, address}= req.body; 
        const data = await Guest.create({
         name , course, phone, address
        })

        await data.save()
        res.status(201).send({
            success:true , 
            message:"user Create Succssfully", 
            data
        })
    } catch (error) {
        
    }
}





const GetControllerGuest= async (req, res) =>{
    try {
        const data = await Guest.find()
            res.status(201).send({
        success:true, 
        message:"User find successfully",
        data
       })
    } catch (error) {
        console.log(error)
            res.status(401).send({
        success:false, 
        message:"User Catch error",
        error
       })
    }
}



const GuestIDController = async (req, res) =>{
    try {
        const data = await Guest.findById(req.params.id)
            res.status(201).send({
        success:true, 
        message:"User find successfully",
        data
       })
    } catch (error) {
        console.log(error)
            res.status(401).send({
        success:false, 
        message:"User Catch error",
        error
       })
    }
}


const GuestDeleteController = async (req, res) =>{
    try {
        const data = await Guest.findByIdAndDelete(req.params.id)
            res.status(201).send({
        success:true, 
        message:"User delete successfully",
        data
       })
    } catch (error) {
        console.log(error)
            res.status(401).send({
        success:false, 
        message:"User Catch error",
        error
       })
    }
}


const UpdateControllerGuest = async(req, res) =>{
    try {
        const {name , course, phone, address}= req.body; 
        const data = await Guest.findByIdAndUpdate(req.params.id,{
          name , course, phone, address
        }, {new:true})

        await data.save()
        res.status(201).send({
            success:true , 
            message:"user update Succssfully", 
            data
        })
    } catch (error) {
            console.log(error)
              res.status(401).send({
        success:false, 
        message:"User Catch error",
        error
       })
    }
}



module.exports = {createControllerGuest,UpdateControllerGuest,GuestDeleteController ,GuestIDController,GetControllerGuest }