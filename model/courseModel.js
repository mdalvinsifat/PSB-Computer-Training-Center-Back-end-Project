const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  project: {
    type: String
  },
  descriptions: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  review: {
    type: String
  },
  student: {
    type: String
  },
  courseCurriculum: {
    type: String
  },
 
  careerOpportunities: {
    type: String
  }
}, { timestamps: true });

const CourseModel = mongoose.model("Course", CourseSchema);

module.exports = CourseModel;
