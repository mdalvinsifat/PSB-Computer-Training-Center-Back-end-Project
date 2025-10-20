const Contact = require("../model/contactModel")


// create Controller 
const createControllerContact = async(req, res) =>{
    try {
        const {name , descriptions, phone }= req.body; 
        const data = await Contact.create({
            name , descriptions, phone
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





const GetController= async (req, res) =>{
    try {
        const data = await Contact.find()
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



const ContactIDController = async (req, res) =>{
    try {
        const data = await Contact.findById(req.params.id)
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


const ContactDeleteController = async (req, res) =>{
    try {
        const data = await Contact.findByIdAndDelete(req.params.id)
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


const UpdateControllerContact = async(req, res) =>{
    try {
        const {name , descriptions, phone }= req.body; 
        const data = await Contact.findByIdAndUpdate(req.params.id,{
            name , descriptions, phone
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



module.exports = {createControllerContact,ContactIDController,GetController,ContactDeleteController,UpdateControllerContact }