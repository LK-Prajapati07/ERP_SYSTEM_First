import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
  isStudent,
  isTeacher,
} from "../middleware/role.middleware.js";

import {
  createSubmission, 
  deleteSubmission,
  evaluateSubmission,
  getAllSubmissions,
  updateSubmission,
} from "../Controller/submission.controller.js";

const submissionRouter = express.Router();


// Create Submission
submissionRouter.post(
  "/",
  verifyAuth,
  isStudent,
  createSubmission
);


// Get All Submissions
submissionRouter.get(
  "/",
  verifyAuth,
  isTeacher,
  getAllSubmissions
);


// Update Submission
submissionRouter.put(
  "/:id",
  verifyAuth,
  isStudent,
  updateSubmission
);


// Delete Submission
submissionRouter.delete(
  "/:id",
  verifyAuth,
  isTeacher,
  deleteSubmission
);


// Evaluate Submission
submissionRouter.put(
  "/:id/evaluate",
  verifyAuth,
  isTeacher,
  evaluateSubmission
);

export default submissionRouter;