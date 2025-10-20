const express = require("express")
const { GetControllerGuest, createControllerGuest, GuestIDController, UpdateControllerGuest, GuestDeleteController } = require("../controller/GuestController")

const router = express.Router()


 router.get("/", GetControllerGuest)
 router.post("/",createControllerGuest)
router.get("/:id", GuestIDController)
router.put("/:id", UpdateControllerGuest)
router.delete("/:id", GuestDeleteController)

module.exports = router