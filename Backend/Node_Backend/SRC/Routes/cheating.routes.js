// cheating.routes.js

import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
   isTeacher,
   isAdmin
} from "../middleware/role.middleware.js";

import {

   createCheatingLog,

   getAllCheatingLogs,

   getCheatingLogById,

   getStudentCheatingLogs,

   updateCheatingLog,

   deleteCheatingLog

} from "../Controller/cheating.controller.js";

const cheatingRouter =
   express.Router();

/* CREATE CHEATING LOG */

cheatingRouter.post(
   "/",
   verifyAuth,
   createCheatingLog
);

/* GET ALL CHEATING LOGS */

cheatingRouter.get(
   "/",
   verifyAuth,
   isTeacher,
   getAllCheatingLogs
);

/* GET CHEATING LOG BY ID */

cheatingRouter.get(
   "/:id",
   verifyAuth,
   getCheatingLogById
);

/* GET STUDENT CHEATING LOGS */

cheatingRouter.get(
   "/student/:studentId",
   verifyAuth,
   getStudentCheatingLogs
);

/* UPDATE CHEATING LOG */

cheatingRouter.put(
   "/:id",
   verifyAuth,
   isTeacher,
   updateCheatingLog
);

/* DELETE CHEATING LOG */

cheatingRouter.delete(
   "/:id",
   verifyAuth,
   isAdmin,
   deleteCheatingLog
);

export default cheatingRouter;