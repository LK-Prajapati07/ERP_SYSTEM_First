import express from "express";

import { verifyAuth }
from "../middleware/auth.middleware.js";

import {
   isTeacher,
   isStudent,
   isAdmin
} from "../middleware/role.middleware.js";

import {

   createResult,

   getAllResults,

   getResultByStudent,

   updateResults,

   deleteResult

} from "../Controller/result.controller.js";

const resultRouter =
   express.Router();

/* CREATE RESULT */

resultRouter.post(
   "/create",
   verifyAuth,
   isTeacher,
   createResult
);

/* GET ALL RESULTS */

resultRouter.get(
   "/",
   verifyAuth,
   isAdmin,
   getAllResults
);

/* GET STUDENT RESULTS */

resultRouter.get(
   "/student/:studentId",
   verifyAuth,
   isStudent,
   getResultByStudent
);

/* UPDATE RESULT */

resultRouter.put(
   "/update/:id",
   verifyAuth,
   isTeacher,
   updateResults
);

/* DELETE RESULT */

resultRouter.delete(
   "/delete/:id",
   verifyAuth,
   isAdmin,
   deleteResult
);

export default resultRouter;