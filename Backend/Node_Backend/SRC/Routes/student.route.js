import express from "express";

import {
    isAdmin,

} from "../middleware/role.middleware.js";

import{createStudent,deleteStudent,getAllStudent,getStudentAttendance,getStudentById,getStudentResults,updateStudent,} from "../Controller/student.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const studentRouter = express.Router();
studentRouter.post(
   "/",
   verifyAuth,
   isAdmin,
   createStudent
);


// Get All Students
studentRouter.get(
    "/",
    verifyAuth,
    isAdmin,
    getAllStudent
);


// Get Single Student
studentRouter.get(
    "/:id",
    verifyAuth,
    getStudentById
);


// Update Student
studentRouter.put(
    "/:id",
    verifyAuth,
    isAdmin,
    updateStudent
);


// Delete Student
studentRouter.delete(
    "/:id",
    verifyAuth,
    isAdmin,
    deleteStudent
);


// Student Attendance
studentRouter.get(
    "/:id/attendance",
    verifyAuth,
    getStudentAttendance
);


// Student Result
studentRouter.get(
    "/:id/result",
    verifyAuth,
    getStudentResults
);

export default studentRouter;