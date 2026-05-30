import { Student } from "../models/Student.model.js";

export const createStudent = async (req, res) => {
  try {
    const {
      userId,
      enrollmentNumber,
      rollNo,
      semester,
      section,
      addmisionId,
      department,
      batchYear,
      guardianName,
      guardianContact,
      attendencePercentage,
      currentCGPA,
    } = req.body;
    if (
      !userId ||
      !enrollmentNumber ||
      !rollNo ||
      !semester ||
      !section ||
      !addmisionId ||
      !department ||
      !batchYear ||
      !guardianName ||
      !guardianContact ||
      attendencePercentage === undefined ||
      currentCGPA === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //Check if student with the same enrollment number already exists
    const existingStudent = await Student.findOne({ enrollmentNumber });
    if (existingStudent) {
      return res.status(400).json({
        message: "Student with the same enrollment number already exists",
      });
    }
    const student = await Student.create({
      userId,
      enrollmentNumber,
      rollNo,
      semester,
      section,
      addmisionId,
      department,
      batchYear,
      guardianName,
      guardianContact,
      attendencePercentage,
      currentCGPA,
    });
    return res
      .status(201)
      .json({ message: "Student created successfully", student });
  } catch (error) {
    
    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: error.message,

      stack: error.stack,
    });
  }
};
export const getAllStudent = async (req, res) => {
  try {
    const student = await Student.find().populate("userId", "name email");
    if (!student) {
      return res.status(404).json({ message: "No students found" });
    }
    return res
      .status(200)
      .json({ message: "Students fetched successfully", student });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id).populate("userId", "name email");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res
      .status(200)
      .json({ message: "Student fetched successfully", student });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(id, req.body, {
     returnDocument:"after",
      runValidators:true
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch(error){

  

   return res.status(500).json({

      success:false,

      message:"Internal Server Error",

      error:error.message
   });
}
};
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Student id is required" });
    }
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Student attendance fetched successfully",
      attendencePercentage: student.attendencePercentage,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getStudentResults = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Student results fetched successfully",
      currentCGPA: student.currentCGPA,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
