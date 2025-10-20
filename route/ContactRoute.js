const express = require("express")
const { GetController, createControllerContact, ContactIDController, UpdateControllerContact, ContactDeleteController } = require("../controller/contactController")

const router = express.Router()


 router.get("/", GetController)
 router.post("/",createControllerContact)
router.get("/:id", ContactIDController)
router.put("/:id", UpdateControllerContact)
router.get("/:id", ContactDeleteController)

module.exports = router