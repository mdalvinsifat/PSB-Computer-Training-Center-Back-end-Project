
const  {cloudinary}  = require("../middleware/cloudinary");
const CourseModel = require("../model/courseModel");

exports.createCourse = async (req, res) => {
  try {
    const { title, duration, project, descriptions, rating, review, student, courseCurriculum, careerOpportunities } = req.body;

    if (!title || !duration) {
      return res.status(400).json({ message: "Title and duration are required fields" });
    }

    let imageUrl = null;

    if (req.file) {
      // Directly get URL from multer-storage-cloudinary middleware
      imageUrl = req.file.path; // or req.file.secure_url, check your req.file object
    }

    const course = await CourseModel.create({
      title,
      image: imageUrl,
      duration,
      project,
      descriptions,
      rating: rating || 0,
      review: review || 0,
      student: student || 0,
      courseCurriculum: courseCurriculum || [],
      careerOpportunities: careerOpportunities || [],
    });

    res.status(201).json({
      success: true,
      data: course,
      message: "Course created successfully"
    });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Get all Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Course
exports.getCourseById = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateCourse = async (req, res) => {
  try {
    // Build updated fields from req.body
    let updatedData = {
      title: req.body.title,
      duration: req.body.duration,
      project: req.body.project,
      descriptions: req.body.descriptions,
      rating: req.body.rating,
      review: req.body.review,
      student: req.body.student,
      courseCurriculum: req.body.courseCurriculum,
      careerOpportunities: req.body.careerOpportunities,
    };

    // Fetch existing course
    const existingCourse = await CourseModel.findById(req.params.id);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Handle new image upload (if any)
    if (req.file) {
      try {
        // OPTIONAL: Delete old image from Cloudinary first (if exists)
        if (existingCourse.image) {
          const publicId = existingCourse.image.split("/").pop().split(".")[0]; // extract Cloudinary public_id
          await cloudinary.uploader.destroy(publicId);
        }

        // Upload new image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
          folder: "courses",
          resource_type: "image",
        });

        updatedData.image = uploadedImage.secure_url;
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    // ✅ Update course with new data
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
