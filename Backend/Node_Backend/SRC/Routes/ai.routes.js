// ai.routes.js

import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
   isTeacher,
   isStudent
} from "../middleware/role.middleware.js";

import {

   evaluateAssignmentAI,

   generateSummaryAI,

   chatWithNotesAI,

   plagiarismCheckAI

} from "../Controller/ai.controller.js";

const aiRouter =
   express.Router();

/* EVALUATE ASSIGNMENT USING AI */

aiRouter.post(
   "/evaluate-assignment/:submissionId",
   verifyAuth,
   isTeacher,
   evaluateAssignmentAI
);

/* GENERATE SUMMARY USING AI */

aiRouter.post(
   "/generate-summary",
   verifyAuth,
   generateSummaryAI
);

/* CHAT WITH NOTES USING RAG */

aiRouter.post( 
   "/chat-with-notes",
   verifyAuth,
   isStudent,
   chatWithNotesAI
);

/* CHECK PLAGIARISM USING AI */

aiRouter.post(
   "/check-plagiarism/:submissionId",
   verifyAuth,
   isTeacher,
   plagiarismCheckAI
);

export default aiRouter;