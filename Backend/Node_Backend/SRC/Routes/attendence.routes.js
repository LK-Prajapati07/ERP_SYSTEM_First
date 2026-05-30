import express from "express";

import { verifyAuth }
from "../middleware/auth.middleware.js";

import {
   isStudent,
   isTeacher
} from "../middleware/role.middleware.js";

import {

   deleteAttendance,

   getAttendanceByStudentId,

   getAttendanceBySubjectId,

   markAttendance,

   updateAttendance

} from "../Controller/attendence.controller.js";

const attendanceRouter =
   express.Router();

/* MARK ATTENDANCE */

attendanceRouter.post(
   "/mark-attendance",
   verifyAuth,
   isTeacher,
   markAttendance
);

/* GET ATTENDANCE BY STUDENT ID */

attendanceRouter.get(
   "/student/:id",
   verifyAuth,
   isStudent,
   getAttendanceByStudentId
);

/* GET ATTENDANCE BY SUBJECT ID */

attendanceRouter.get(
   "/subject/:id",
   verifyAuth,
   isTeacher,
   getAttendanceBySubjectId
);

/* UPDATE ATTENDANCE */

attendanceRouter.put(
   "/update/:id",
   verifyAuth,
   isTeacher,
   updateAttendance
);

/* DELETE ATTENDANCE */

attendanceRouter.delete(
   "/delete/:id",
   verifyAuth,
   isTeacher,
   deleteAttendance
);

export default attendanceRouter;