import express from "express";

import { verifyAuth }
from "../middleware/auth.middleware.js";

import {
   isTeacher,
   isAdmin
} from "../middleware/role.middleware.js";

import {
 
   createQuestionPaper,

   generateQuestionPaperAI,

   getAllQuestionPapers,

   getQuestionPaperById,

   updateQuestionPaper,

   deleteQuestionPaper

} from "../Controller/questionPaper.controller.js";

const questionPaperRouter =
   express.Router();

/* CREATE QUESTION PAPER */

questionPaperRouter.post(
   "/create",
   verifyAuth,
   isTeacher,
   createQuestionPaper
);
 
/* GENERATE QUESTION PAPER USING AI */

questionPaperRouter.post(
   "/generate-ai",
   verifyAuth,
   isTeacher,
   generateQuestionPaperAI
);

/* GET ALL QUESTION PAPERS */

questionPaperRouter.get(
   "/",
   verifyAuth,
   getAllQuestionPapers
);

/* GET QUESTION PAPER BY ID */

questionPaperRouter.get(
   "/:id",
   verifyAuth,
   getQuestionPaperById
);

/* UPDATE QUESTION PAPER */

questionPaperRouter.put(
   "/update/:id",
   verifyAuth,
   isTeacher,
   updateQuestionPaper
);

/* DELETE QUESTION PAPER */

questionPaperRouter.delete(
   "/delete/:id",
   verifyAuth,
   isAdmin,
   deleteQuestionPaper
);

export default questionPaperRouter;