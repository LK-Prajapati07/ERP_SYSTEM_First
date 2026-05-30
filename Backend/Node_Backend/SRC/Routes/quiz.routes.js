// quiz.routes.js

import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
   isTeacher,
   isStudent
} from "../middleware/role.middleware.js";

import {

   createQuiz,

   generateQuizAI,

   getAllQuizzes,

   getQuizById,

   updateQuiz,

   deleteQuiz,

   startQuiz

} from "../Controller/quiz.controller.js";

const quizRouter = express.Router();

/* CREATE QUIZ */

quizRouter.post(
   "/",
   verifyAuth,
   isTeacher,
   createQuiz
);

/* GENERATE QUIZ USING AI */

quizRouter.post(
   "/generate-ai",
   verifyAuth,
   isTeacher, 
   generateQuizAI
);

/* GET ALL QUIZZES */

quizRouter.get(
   "/",
   verifyAuth,
   getAllQuizzes
);

/* GET QUIZ BY ID */

quizRouter.get(
   "/:id",
   verifyAuth,
   getQuizById
);

/* UPDATE QUIZ */

quizRouter.put(
   "/:id",
   verifyAuth,
   isTeacher,
   updateQuiz
);

/* DELETE QUIZ */

quizRouter.delete(
   "/:id",
   verifyAuth,
   isTeacher,
   deleteQuiz
);

/* START QUIZ */

quizRouter.post(
   "/start",
   verifyAuth,
   isStudent,
   startQuiz
);

export default quizRouter;