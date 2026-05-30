// quizAttempt.routes.js

import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
   isStudent,
   isTeacher
} from "../middleware/role.middleware.js";

import {

   startQuizAttempt,

   submitQuizAttempt,

   getAllQuizAttempts,

   getQuizAttemptById,

   getStudentQuizAttempts,

   deleteQuizAttempt,

   updateCheatingData

} from "../Controller/quizAttempt.controller.js";

const quizAttemptRouter =
   express.Router();

/* START QUIZ ATTEMPT */

quizAttemptRouter.post(
   "/start",
   verifyAuth,
   isStudent,
   startQuizAttempt
);

/* SUBMIT QUIZ */

quizAttemptRouter.put(
   "/:attemptId/submit",
   verifyAuth,
   isStudent,
   submitQuizAttempt
);

/* GET ALL ATTEMPTS */

quizAttemptRouter.get(
   "/",
   verifyAuth,
   isTeacher,
   getAllQuizAttempts
);

/* GET ATTEMPT BY ID */

quizAttemptRouter.get(
   "/:id",
   verifyAuth,
   getQuizAttemptById
);

/* GET STUDENT ATTEMPTS */

quizAttemptRouter.get(
   "/student/:studentId",
   verifyAuth,
   getStudentQuizAttempts
);

/* UPDATE CHEATING DATA */

quizAttemptRouter.put(
   "/:attemptId/cheating",
   verifyAuth,
   updateCheatingData
);

/* DELETE ATTEMPT */

quizAttemptRouter.delete(
   "/:id",
   verifyAuth,
   isTeacher,
   deleteQuizAttempt
);

export default quizAttemptRouter;