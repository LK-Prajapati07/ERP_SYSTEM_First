// exam.routes.js

import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
   isTeacher,
   isAdmin
} from "../middleware/role.middleware.js";

import {

   createExam,

   getAllExams,

   getExamById,

   updateExam,

   deleteExam,

   getExamsBySemester,

   getExamsBySubject

} from "../Controller/exam.controller.js";

const examRouter =
   express.Router();

/* CREATE EXAM */

examRouter.post(
   "/",
   verifyAuth,
   isTeacher,
   createExam
);

/* GET ALL EXAMS */

examRouter.get(
   "/",
   verifyAuth,
   getAllExams
);

/* GET EXAM BY ID */

examRouter.get(
   "/:id",
   verifyAuth,
   getExamById
);


examRouter.get(
   "/subject/:subjectId",
   verifyAuth,
   getExamsBySubject
);

/* UPDATE EXAM */

examRouter.put(
   "/:id",
   verifyAuth,
   isTeacher,
   updateExam
);

/* DELETE EXAM */

examRouter.delete(
   "/:id",
   verifyAuth,
   isAdmin,
   deleteExam
);

export default examRouter;