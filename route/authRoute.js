const express = require("express");
const {RegisterController, LoginController, GetUsersController, UpdateUserController, DeleteUserController, ForgotPasswordController, ResetPasswordController, LogoutController} = require("../controller/authController");
const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/get", GetUsersController);
router.put("/:id", UpdateUserController);
router.delete("/:id", DeleteUserController);
router.post("/logout", LogoutController); 

router.post("/forgot-password", ForgotPasswordController);
router.post("/reset-password/:token", ResetPasswordController);
module.exports = router;