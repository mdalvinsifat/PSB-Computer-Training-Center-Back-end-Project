// controllers/admissionController.js

const Admission = require("../model/admissionModel");

const CreateAdmission = async (req, res) => {
    try {
        const { name, description, phone, address, email } = req.body;

        const admission = new Admission({
            name, description, phone, address, email
        });

        await admission.save();

        res.status(201).json({ success: true, admission });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Catch Error"
        });
    }
};



const GetAllAdmission = async(req , res)=>{
    try {
        
        const data = await Admission.find()
        res.status(201).send({
            success:true, 
            message:"user get successfully ", 
           
           data
        })
    } catch (error) {
        console.log(error)
       res.status(401).send({
        success:false, 
        message:"User Catch error"
       })
    }
}



const IdGetAdmission = async (req, res) =>{
    try {
        const id = req.params.id
        const data = await Admission.findById(id)
            res.status(201).send({
            success:true, 
            message:"user get successfully ", 
            data
        })
    } catch (error) {
        console.log(error)
         res.status(401).send({
        success:false, 
        message:"User Catch error"
       })
    }
}



const deleteAdmission = async(req, res ) =>{
    try {
        const id = req.params.id;
        const dataDelete = await Admission.findByIdAndDelete(id)
          const data = await Admission.findById(id)
            res.status(201).send({
            success:true, 
            message:"user delete successfully ", 
            dataDelete
        })
    } catch (error) {
        console.log(error)
            res.status(401).send({
        success:false, 
        message:"User Catch error"
       })
    }
}




const updateAdmissionController = async(req, res) =>{
    try {
                const { name, description, phone, address, email } = req.body;
                const updateUser = await Admission.findByIdAndUpdate(req.params.id , { name, description, phone, address, email }  , {new:true})
    res.status(201).send({
        success:true, 
        message:"update successfully ", 
        updateUser

       })
    } catch (error) {
        console.log(error);
        
    res.status(401).send({
        success:false, 
        message:"User Catch error",
        error
       })

    }
} 

module.exports = { CreateAdmission,GetAllAdmission,IdGetAdmission,deleteAdmission,updateAdmissionController };
