const express = require("express")
const { CreateAdmission, GetAllAdmission, IdGetAdmission, deleteAdmission, updateAdmissionController } = require("../controller/admissionController")

const router = express.Router()


router.post("/", CreateAdmission)
router.get("/", GetAllAdmission)
router.get("/:id", IdGetAdmission)
router.delete("/:id", deleteAdmission)
router.put("/:id", updateAdmissionController)

module.exports = router