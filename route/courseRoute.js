const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");
const { upload } = require("../middleware/cloudinary");

// Use fields() to accept multiple file fields


// CRUD Routes
router.post("/", upload.single("image"), courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", upload.single("image"), courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
