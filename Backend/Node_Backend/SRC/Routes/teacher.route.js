import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
  isAdmin,
  isTeacher,
} from "../middleware/role.middleware.js";

import {
  createTeacher,
  deleteTeacher,
  getAllTeachers, 
  getTeacherProfile,
  getTeacherSubjects,
  updateTeacher,
} from "../Controller/teacher.controller.js";

const teacherRouter = express.Router();


// Create Teacher
teacherRouter.post(
  "/",
  verifyAuth,
  isAdmin,
  createTeacher
);


// Get All Teachers
teacherRouter.get(
  "/",
  verifyAuth,
  isAdmin,
  getAllTeachers
);


// Get Teacher Profile
teacherRouter.get(
  "/:id",
  verifyAuth,
  getTeacherProfile
);


// Get Teacher Subjects
teacherRouter.get(
  "/:id/subjects",
  verifyAuth,
  getTeacherSubjects
);


// Update Teacher
teacherRouter.put(
  "/:id",
  verifyAuth,
  isAdmin,
  updateTeacher
);


// Delete Teacher
teacherRouter.delete(
  "/:id",
  verifyAuth,
  isAdmin,
  deleteTeacher
);

export default teacherRouter;