import express from "express";

import { verifyAuth }
from "../middleware/auth.middleware.js";

import {
   isStudent,
   isTeacher
} from "../middleware/role.middleware.js";

import {

   createAssignment,

   deleteAssignment,

   getAllAssignments,

   getAssignmentById,

   updateAssignment

} from "../Controller/assignment.controller.js";

const assignRoutes =
   express.Router();

/* CREATE ASSIGNMENT */

assignRoutes.post(
   "/create/assignment",
   verifyAuth,
   isTeacher,
   createAssignment
);

/* GET ALL ASSIGNMENTS */

assignRoutes.get(
   "/",
   verifyAuth,
   isStudent,
   getAllAssignments
);

/* GET ASSIGNMENT BY ID */

assignRoutes.get(
   "/:id",
   verifyAuth,
   isStudent,
   getAssignmentById
);

/* UPDATE ASSIGNMENT */

assignRoutes.put(
   "/update/:id",
   verifyAuth,
   isTeacher,
   updateAssignment
);

/* DELETE ASSIGNMENT */

assignRoutes.delete(
   "/delete/:id",
   verifyAuth,
   isTeacher,
   deleteAssignment
);

export default assignRoutes;